#!/usr/bin/env python3
"""Rend une vidéo de formation (1920x1080, 25 i/s) à partir d'une voix off et d'un fichier de scènes.

Usage :
    python render_clip.py SCENES.json VOIX.mp3 DOSSIER_DE_SORTIE

Étapes : transcription mot à mot de la voix (faster-whisper, en local) → alignement sur le texte
du script → horaires des écrans et des sous-titres → écrans PNG (Playwright) → montage ffmpeg
(fondus, sous-titres incrustés, voix normalisée). Sorties : MP4, SRT (pour CapCut), ASS, PNG.
"""
import difflib
import html
import json
import pathlib
import re
import shutil
import subprocess
import sys
import unicodedata

HERE = pathlib.Path(__file__).resolve().parent
W, H, FPS = 1920, 1080, 25
LEAD = 0.6    # secondes de carton titre avant la voix
TAIL = 1.6    # secondes après la voix
XF = 0.35     # durée des fondus entre deux écrans
PRE = 0.12    # l'écran arrive un poil avant les mots
SUB_MAX = 84  # caractères max par sous-titre (2 lignes)
ACRONYMS = {"TVA", "CAF", "FENIX", "DGAE", "DBS", "ANFR", "AAI", "CITES", "ISPF", "DICP", "CCISM",
            "XPF", "OPT", "DHL", "UPS", "PF", "MOQ", "FOB", "SH", "KPI", "IA", "DM", "TDL", "OK", "UE"}


# ---------------------------------------------------------------- texte et alignement
def strip_tags(text):
    return re.sub(r"\[[^\]]*\]", " ", text)


def norm(word):
    w = unicodedata.normalize("NFD", word.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]", "", w)


def script_tokens(voice_text):
    clean = re.sub(r"\s+", " ", strip_tags(voice_text)).strip()
    return clean.split(" ")


def load_audio(path):
    """Décode l'audio en mono 16 kHz avec ffmpeg (évite les soucis de version de PyAV)."""
    import numpy as np
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "s16le", "-ac", "1", "-ar", "16000", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768.0


def transcribe(audio):
    from faster_whisper import WhisperModel
    model = WhisperModel("small", device="cpu", compute_type="int8")
    segments, _ = model.transcribe(load_audio(audio), language="fr", word_timestamps=True, beam_size=5)
    words = []
    for seg in segments:
        for w in seg.words or []:
            words.append((w.word.strip(), float(w.start), float(w.end)))
    return words


def align(tokens, words, audio_end):
    """Donne à chaque mot du script (start, end) en secondes, par rapport au début de la voix."""
    a = [norm(t) for t in tokens]
    b = [norm(w[0]) for w in words]
    times = [None] * len(tokens)
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    for blk in sm.get_matching_blocks():
        for k in range(blk.size):
            i, j = blk.a + k, blk.b + k
            if a[i]:
                times[i] = (words[j][1], words[j][2])
    known = [i for i, t in enumerate(times) if t]
    if not known:
        raise SystemExit("Alignement impossible : aucun mot reconnu.")
    # trous : on répartit le temps disponible au prorata de la longueur des mots
    bounds = [(-1, 0.0)] + [(i, None) for i in known] + [(len(tokens), audio_end)]
    for (p, _), (q, _) in zip(bounds, bounds[1:]):
        if q - p <= 1:
            continue
        t0 = times[p][1] if p >= 0 else 0.0
        t1 = times[q][0] if q < len(tokens) else audio_end
        gap = list(range(p + 1, q))
        weights = [max(len(a[i]), 1) for i in gap]
        total = sum(weights)
        cur = t0
        for i, wgt in zip(gap, weights):
            d = (t1 - t0) * wgt / total
            times[i] = (cur, cur + d)
            cur += d
    return times


def find_anchor(tokens, anchor, start):
    want = [x for x in (norm(t) for t in script_tokens(anchor)) if x]
    idx = [(i, norm(t)) for i, t in enumerate(tokens) if norm(t)]
    for k in range(len(idx) - len(want) + 1):
        if idx[k][0] < start:
            continue
        if [n for _, n in idx[k:k + len(want)]] == want:
            return idx[k][0]
    raise SystemExit(f"Repère introuvable dans le texte : « {anchor} »")


# ---------------------------------------------------------------- sous-titres
def display_word(tok, sentence_start):
    core = re.sub(r"[^\wÀ-ÿ'’-]", "", tok)
    if len(core) > 1 and core.isupper() and core not in ACRONYMS:
        low = tok.lower()
        if sentence_start:
            low = low[:1].upper() + low[1:]
        return low
    return tok


def subtitle_chunks(tokens, times):
    """Découpe le texte en sous-titres courts, aux fins de phrase puis aux virgules ou points de suspension."""
    sentences, cur = [], []
    for i, t in enumerate(tokens):
        cur.append(i)
        if re.search(r"(\.|\?|!|…|»)$", t) and not t.endswith("..."):
            sentences.append(cur)
            cur = []
    if cur:
        sentences.append(cur)

    def text_of(ids):
        return " ".join(tokens[i] for i in ids)

    chunks = []
    for sent in sentences:
        pending = [sent]
        while pending:
            part = pending.pop(0)
            if len(text_of(part)) <= SUB_MAX or len(part) < 4:
                chunks.append(part)
                continue
            # coupe la plus proche du milieu, de préférence après une virgule ou des points de suspension
            mid = len(text_of(part)) / 2
            best, best_score = None, None
            pos = 0
            for k, i in enumerate(part[:-1]):
                pos += len(tokens[i]) + 1
                bonus = 0 if re.search(r"(,|\.\.\.|:|;)$", tokens[i]) else 25
                score = abs(pos - mid) + bonus
                if best_score is None or score < best_score:
                    best, best_score = k, score
            pending[:0] = [part[:best + 1], part[best + 1:]]
    out = []
    for ids in chunks:
        words, start_of_sentence = [], True
        for i in ids:
            words.append(display_word(tokens[i], start_of_sentence))
            start_of_sentence = bool(re.search(r"(\.|\?|!)$", tokens[i])) and not tokens[i].endswith("...")
        text = " ".join(words).replace("...", "…")
        out.append([times[ids[0]][0], times[ids[-1]][1], text])
    for k in range(len(out)):
        out[k][1] = max(out[k][1] + 0.25, out[k][0] + 0.9)
        if k + 1 < len(out):
            out[k][1] = min(out[k][1], out[k + 1][0] - 0.04)
    return out


def ts_srt(t):
    ms = int(round(t * 1000))
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}"


def ts_ass(t):
    cs = int(round(t * 100))
    return f"{cs // 360000}:{cs // 6000 % 60:02d}:{cs // 100 % 60:02d}.{cs % 100:02d}"


def write_subs(chunks, srt_path, ass_path):
    with open(srt_path, "w", encoding="utf-8") as f:
        for n, (s, e, t) in enumerate(chunks, 1):
            f.write(f"{n}\n{ts_srt(s)} --> {ts_srt(e)}\n{t}\n\n")
    head = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sub,Inter SemiBold,46,&H00E9F0F2,&H00E9F0F2,&H4D0D0B0B,&H4D0D0B0B,0,0,0,0,100,100,0,0,3,16,0,2,260,260,72,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    with open(ass_path, "w", encoding="utf-8") as f:
        f.write(head)
        for s, e, t in chunks:
            t = t.replace("{", "(").replace("}", ")")
            f.write(f"Dialogue: 0,{ts_ass(s)},{ts_ass(e)},Sub,,0,0,0,,{t}\n")


# ---------------------------------------------------------------- écrans
def rich(text):
    """**mot** → mot en or ; ~~mot~~ → mot en corail."""
    t = html.escape(text)
    t = re.sub(r"\*\*(.+?)\*\*", r'<span class="hl">\1</span>', t)
    t = re.sub(r"~~(.+?)~~", r'<span class="bad">\1</span>', t)
    return t


def slide_inner(s):
    k = s["type"]
    label = f'<p class="label">{rich(s["label"])}</p>' if s.get("label") else ""
    sub = f'<p class="sub">{rich(s["sub"])}</p>' if s.get("sub") else ""
    if k == "title":
        note = f'<p class="note">{rich(s["note"])}</p>' if s.get("note") else ""
        return (f'<p class="label">{rich(s["eyebrow"])}</p><h1 class="title">{rich(s["title"])}</h1>'
                + (f'<p class="subtitle">{rich(s["subtitle"])}</p>' if s.get("subtitle") else "") + note)
    if k == "statement":
        stamp = f'<p class="stamp">{rich(s["stamp"])}</p>' if s.get("stamp") else ""
        return f'{label}<p class="statement">{rich(s["text"])}</p>{sub}{stamp}'
    if k == "bullets":
        n = s.get("reveal", len(s["items"]))
        rows = []
        for i, it in enumerate(s["items"]):
            text, _, det = it.partition(" → ")
            cls = "item" + (" new" if i == n - 1 else "") + (" bad" if s.get("bad") else "") + ("" if i < n else " hide")
            mk = "✗" if s.get("bad") else f"{i + 1:02d}"
            det_html = f' <span class="det">→ {rich(det)}</span>' if det else ""
            rows.append(f'<div class="{cls}"><span class="mk">{mk}</span><span>{rich(text)}{det_html}</span></div>')
        head = f'<h2 class="h2">{rich(s["heading"])}</h2>' if s.get("heading") else ""
        return f'{label}{head}<div class="items">{"".join(rows)}</div>{sub}'
    if k == "chain":
        n = s.get("reveal", 0)
        cur = s.get("current", n - 1)
        parts = []
        for i, step in enumerate(s["steps"]):
            cls = "node" + (" on" if i < n else "") + (" cur" if i == cur and i < n else "")
            if i in s.get("key", []) and i < n and i != cur:
                cls += " key"
            if i:
                parts.append(f'<span class="arrow{" on" if i < n else ""}">→</span>')
            parts.append(f'<span class="{cls}">{rich(step)}</span>')
        note = f'<p class="sub">{rich(s["note"])}</p>' if s.get("note") else ""
        return f'{label}<div class="chain">{"".join(parts)}</div>{note}'
    if k == "cards":
        n = s.get("reveal", len(s["cards"]))
        best = s.get("best")
        cards = []
        for i, c in enumerate(s["cards"]):
            cls = "card" + (" best" if best == i and i < n else "") + ("" if i < n else " hide")
            badge = f'<span class="badge">{rich(c["badge"])}</span>' if (best == i and c.get("badge")) else ""
            minus = f'<p class="minus">– {rich(c["minus"])}</p>' if c.get("minus") else ""
            cards.append(f'<div class="{cls}"><span class="n">{c["n"]}</span><h3>{rich(c["title"])}</h3>'
                         f'<p class="plus">+ {rich(c["plus"])}</p>{minus}{badge}</div>')
        return f'{label}<div class="cards">{"".join(cards)}</div>{sub}'
    if k == "table":
        n = s.get("reveal", len(s["rows"]) + (1 if s.get("total") else 0))
        rows = []
        for i, r in enumerate(s["rows"]):
            cls = "tr" + (" subt" if r[0].startswith("=") else "") + ("" if i < n else " hide")
            rows.append(f'<div class="{cls}"><span>{rich(r[0].lstrip("= "))}</span><span class="v">{rich(r[1])}</span></div>')
        if s.get("total"):
            i = len(s["rows"])
            cls = "tr tot" + ("" if i < n else " hide")
            rows.append(f'<div class="{cls}"><span>{rich(s["total"][0])}</span><span class="v">{rich(s["total"][1])}</span></div>')
        stamp = f'<p class="stamp">{rich(s["stamp"])}</p>' if s.get("stamp") else ""
        head = f'<h2 class="h2">{rich(s["heading"])}</h2>' if s.get("heading") else ""
        return f'{label}{head}<div class="tbl">{"".join(rows)}</div>{sub}{stamp}'
    if k == "formula":
        return f'{label}<p class="formula">{rich(s["text"])}</p>{sub}'
    if k == "retenir":
        lines = "".join(f'<p class="line">{rich(x)}</p>' for x in s["lines"])
        return f'<div class="box"><p class="label">{rich(s.get("label", "À retenir"))}</p>{lines}{sub}</div>'
    if k == "steps":
        n = s.get("reveal", len(s["items"]))
        rows = "".join(f'<div class="step{"" if i < n else " hide"}"><span class="num">{i + 1}</span><span>{rich(x)}</span></div>'
                       for i, x in enumerate(s["items"]))
        head = f'<h2 class="h2">{rich(s["heading"])}</h2>' if s.get("heading") else ""
        return f'{label}{head}<div class="steps">{rows}</div>{sub}'
    if k == "calc":
        n = s.get("reveal", len(s["fields"]))
        fields = "".join(
            f'<div class="field{"" if i < n else " empty"}"><span>{rich(f[0])}</span><span class="v">{rich(f[1]) if i < n else "—"}</span></div>'
            for i, f in enumerate(s["fields"]))
        res = s.get("result")
        res_html = (f'<div class="result {res["kind"]}">{rich(res["text"])}</div>' if res
                    else '<div class="result wait">Résultat…</div>')
        return (f'<div class="calc"><div class="calc-l">{label}<h2 class="h2">{rich(s["heading"])}</h2>{sub}</div>'
                f'<div class="panel">{fields}{res_html}</div></div>')
    if k == "end":
        return (f'<p class="label">{rich(s.get("label", "Prochaine leçon"))}</p>'
                f'<p class="endt"><span class="play">▶</span>{rich(s["title"])}</p>{sub}')
    raise SystemExit(f"Type d'écran inconnu : {k}")


def slide_html(spec, s):
    css = (HERE / "slides.css").read_text(encoding="utf-8")
    return f"""<!doctype html><html lang="fr"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Inter:wght@500;600;700&family=JetBrains+Mono:wght@500;700&display=block">
<style>{css}</style></head><body>
<header class="hdr"><span class="brand">Import Mastery · Fenua Edition</span><span class="where">{html.escape(spec["where"])}</span></header>
<div class="rule"></div>
<main class="stage stage-{s["type"]}">{slide_inner(s)}</main>
</body></html>"""


# ---------------------------------------------------------------- montage
def run(cmd):
    subprocess.run(cmd, check=True)


def ensure_font():
    fonts = HERE / "fonts"
    ttf = fonts / "Inter-SemiBold.ttf"
    if ttf.exists():
        return fonts
    fonts.mkdir(exist_ok=True)
    css = subprocess.run(["curl", "-s", "https://fonts.googleapis.com/css2?family=Inter:wght@600"],
                         capture_output=True, text=True, check=True).stdout
    url = re.search(r"url\((https://[^)]+\.ttf)\)", css).group(1)
    run(["curl", "-s", "-o", str(ttf), url])
    return fonts


def load_spec(spec_path):
    spec = json.loads(spec_path.read_text(encoding="utf-8"))
    if "voice_from" in spec:  # le texte vient directement du script du module (une seule source de vérité)
        src = (spec_path.parent / spec["voice_from"]["file"]).resolve()
        blocks = re.findall(r"### 🎙️ VOIX OFF \(à coller\) :\n```\n(.*?)```", src.read_text(encoding="utf-8"), re.S)
        spec["voice"] = blocks[spec["voice_from"]["clip"]].strip()
    return spec


def storyboard(spec, outdir):
    """Rend seulement les écrans (sans voix) et une planche contact, pour valider le visuel."""
    from PIL import Image, ImageDraw, ImageFont
    work = outdir / f"{spec['slug']}_storyboard"
    if work.exists():
        shutil.rmtree(work)
    work.mkdir(parents=True)
    tokens, last = script_tokens(spec["voice"]), 0
    for beat in spec["beats"][1:]:
        last = find_anchor(tokens, beat["at"], last)  # vérifie que chaque repère existe dans le texte
    jobs = []
    for n, beat in enumerate(spec["beats"]):
        hp, pp = work / f"slide_{n:02d}.html", work / f"slide_{n:02d}.png"
        hp.write_text(slide_html(spec, beat["slide"]), encoding="utf-8")
        jobs.append({"html": str(hp), "png": str(pp)})
    (work / "jobs.json").write_text(json.dumps(jobs), encoding="utf-8")
    run(["node", str(HERE / "render_slides.js"), str(work / "jobs.json")])
    cols, tw, th, cap = 4, 480, 270, 34
    rows = -(-len(jobs) // cols)
    sheet = Image.new("RGB", (cols * (tw + 12) + 12, rows * (th + cap + 12) + 12), (40, 40, 46))
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype(str(ensure_font() / "Inter-SemiBold.ttf"), 15)
    except OSError:
        font = ImageFont.load_default()
    for n, (job, beat) in enumerate(zip(jobs, spec["beats"])):
        x, y = 12 + (n % cols) * (tw + 12), 12 + (n // cols) * (th + cap + 12)
        sheet.paste(Image.open(job["png"]).convert("RGB").resize((tw, th)), (x, y))
        cue = "début" if n == 0 else "« " + beat["at"][:52] + " »"
        draw.text((x + 2, y + th + 8), f"{n:02d} · {cue}", fill=(200, 200, 205), font=font)
    out = outdir / f"{spec['slug']}_storyboard.png"
    sheet.save(out)
    print(json.dumps({"storyboard": str(out), "ecrans": len(jobs)}, ensure_ascii=False))


def main():
    spec_path, audio, outdir = map(pathlib.Path, sys.argv[1:4])
    spec = load_spec(spec_path)
    outdir.mkdir(parents=True, exist_ok=True)
    if str(audio) == "--storyboard":
        storyboard(spec, outdir)
        return
    slug = spec["slug"]
    work = outdir / f"{slug}_work"
    if work.exists():
        shutil.rmtree(work)
    work.mkdir()

    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(audio)],
                               capture_output=True, text=True, check=True).stdout)
    tokens = script_tokens(spec["voice"])
    words = transcribe(audio)
    times = align(tokens, words, dur)
    (work / "alignment.json").write_text(json.dumps(
        {"whisper": words, "script": [[t, s, e] for t, (s, e) in zip(tokens, times)]}, ensure_ascii=False, indent=0), encoding="utf-8")

    # horaires des écrans
    beats, last = [], 0
    for n, beat in enumerate(spec["beats"]):
        if n == 0:
            t = 0.0
        else:
            idx = find_anchor(tokens, beat["at"], last)
            last = idx
            t = max(LEAD + times[idx][0] - PRE, beats[-1][0] + XF + 0.2)
        beats.append((t, beat["slide"]))
    total = LEAD + dur + TAIL

    # écrans PNG
    jobs = []
    for n, (_, s) in enumerate(beats):
        hp, pp = work / f"slide_{n:02d}.html", work / f"slide_{n:02d}.png"
        hp.write_text(slide_html(spec, s), encoding="utf-8")
        jobs.append({"html": str(hp), "png": str(pp)})
    (work / "jobs.json").write_text(json.dumps(jobs), encoding="utf-8")
    run(["node", str(HERE / "render_slides.js"), str(work / "jobs.json")])

    # sous-titres (décalés du carton titre)
    chunks = [[s + LEAD, e + LEAD, t] for s, e, t in subtitle_chunks(tokens, times)]
    srt, ass = outdir / f"{slug}.srt", work / "subs.ass"
    write_subs(chunks, srt, ass)
    fonts = ensure_font()

    # montage : fondus entre écrans + sous-titres + voix
    cmd = ["ffmpeg", "-y", "-loglevel", "error"]
    starts = [b[0] for b in beats] + [total]
    for n in range(len(beats)):
        length = starts[n + 1] - starts[n] + (XF if n < len(beats) - 1 else 0)
        cmd += ["-loop", "1", "-framerate", str(FPS), "-t", f"{length:.3f}", "-i", jobs[n]["png"]]
    cmd += ["-i", str(audio)]
    graph, prev = [], "[0:v]"
    for n in range(1, len(beats)):
        out = f"[v{n}]"
        graph.append(f"{prev}[{n}:v]xfade=transition=fade:duration={XF}:offset={starts[n]:.3f}{out}")
        prev = out
    ass_esc = str(ass).replace(":", r"\:")
    fonts_esc = str(fonts).replace(":", r"\:")
    graph.append(f"{prev}format=yuv420p,ass='{ass_esc}':fontsdir='{fonts_esc}'[v]")
    a = len(beats)
    graph.append(f"[{a}:a]adelay={int(LEAD * 1000)}:all=1,apad,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100[a]")
    mp4 = outdir / f"{slug}.mp4"
    cmd += ["-filter_complex", ";".join(graph), "-map", "[v]", "-map", "[a]", "-t", f"{total:.3f}",
            "-r", str(FPS), "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-tune", "stillimage",
            "-c:a", "aac", "-b:a", "160k", "-ac", "2", "-movflags", "+faststart", str(mp4)]
    run(cmd)
    print(json.dumps({"mp4": str(mp4), "srt": str(srt), "duree": round(total, 1), "ecrans": len(beats),
                      "sous_titres": len(chunks)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
