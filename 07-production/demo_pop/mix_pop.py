#!/usr/bin/env python3
"""Mixage de la démo POP : voix déjà générée (aucun crédit) + musique « pop île » plus rythmée + bruitages calés sur l'image.
Usage : python3 mix_pop.py voix.mp3 sortie.wav"""
import subprocess, sys, wave
from pathlib import Path
import numpy as np
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "tools"))
import sound  # noqa: E402

SR = sound.SR; TOTAL = 23.0; VOICE_AT = 0.6

def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768.0

def place(buf, x, t, gain=1.0):
    o = int(t * SR)
    if o >= len(buf): return
    e = min(len(x), len(buf) - o); buf[o:o + e] += x[:e] * gain

def kick(g=0.9):
    n = int(0.28 * SR); t = np.arange(n) / SR
    f = 150 * np.exp(-t * 28) + 48
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 11) * g

def clap(g=0.5):
    n = int(0.18 * SR); t = np.arange(n) / SR; rng = np.random.default_rng(11)
    x = rng.standard_normal(n); x = x - sound.lowpass(x, 900)
    env = sum(np.exp(-np.clip(t - d, 0, None) * 60) * (t >= d) for d in (0, 0.012, 0.024)) / 3
    return x * env * g

def hat(g=0.18):
    n = int(0.05 * SR); t = np.arange(n) / SR; rng = np.random.default_rng(13)
    x = rng.standard_normal(n); x = x - sound.lowpass(x, 6000)
    return x * np.exp(-t * 90) * g

def key(seed, g=0.25):
    n = int(0.04 * SR); t = np.arange(n) / SR; rng = np.random.default_rng(seed)
    x = rng.standard_normal(n); x = x - sound.lowpass(x, 2500)
    return (x * np.exp(-t * 160) + 0.4 * np.sin(2 * np.pi * 1800 * t) * np.exp(-t * 200)) * g

def buzz(g=0.35):
    n = int(0.32 * SR); t = np.arange(n) / SR
    x = np.sign(np.sin(2 * np.pi * 110 * t)) * 0.6 + np.sign(np.sin(2 * np.pi * 116 * t)) * 0.4
    return sound.lowpass(x, 1800) * np.minimum(1, t / 0.005) * np.exp(-t * 4) * g

def kaching(g=0.4):
    y = sound.ding(2637, 1.0, 1.2) * 0.6 + sound.ding(3520, 1.0, 1.2) * 0.5
    c = np.zeros(len(y)); c[int(0.07 * SR):] = sound.ding(4186, 1.0, 1.2)[: len(y) - int(0.07 * SR)] * 0.6
    y = y + c + np.pad(sound.tick(0.8), (0, len(y) - len(sound.tick(0.8))))
    return y / np.abs(y).max() * g

def confetti(g=0.22):
    out = np.zeros(int(0.7 * SR)); rng = np.random.default_rng(17)
    for k in range(14):
        p = sound.pop(1200 + rng.random() * 1800, 1.0); o = int(rng.random() * 0.5 * SR)
        out[o:o + len(p)] += p[: len(out) - o] * (0.3 + 0.7 * rng.random())
    return out / np.abs(out).max() * g

n = int(TOTAL * SR)
voice = np.zeros(n); v = load(sys.argv[1]); v = v / (np.abs(v).max() + 1e-9) * 0.89; place(voice, v, VOICE_AT)

fx = np.zeros(n)
cues = [
    (0.15, sound.whoosh(0.45, True, 0.45)),                          # bandeau ATTENTION
    (0.60, sound.thud(0.55)), (1.22, sound.thud(0.55)),              # mots qui claquent
    (1.62, sound.whoosh(0.4, True, 0.5)),                            # cercle -> jaune
    *[(1.76 + k * 0.04, sound.pop(700 + k * 120, 0.32)) for k in range(2)],
    *[(2.06 + k * 0.04, sound.pop(900 + k * 120, 0.32)) for k in range(4)],
    *[(2.36 + k * 0.035, sound.pop(1100 + k * 90, 0.3)) for k in range(6)],
    *[(2.48 + k * 0.03, sound.tick(0.35)) for k in range(16)],         # les 16 cartes
    (3.30, sound.riser(1.1, 0.22)),                                  # montée vers « celui-là »
    (4.40, sound.ding(1318.5, 0.42)), (4.45, confetti(0.3)), (4.62, sound.whoosh(0.3, False, 0.3)),
    (5.30, sound.whoosh(0.45, True, 0.5)),                           # cercle -> rose
    (5.82, sound.pop(800, 0.4)), (6.50, sound.pop(950, 0.4)),
    (7.08, sound.thud(0.95)), (7.10, sound.boing(0.35)), (7.28, sound.sparkle(0.2)),
    (7.55, sound.whoosh(0.45, False, 0.55)),                         # travelling -> navigateur
    *[(8.00 + k * 0.06, key(20 + k)) for k in range(16)],            # frappe « formation import »
    (8.30, sound.boing(0.25)),                                       # la frégate passe la tête
    (10.18, sound.pop(880, 0.5)), (10.20, sound.whoosh(0.25, False, 0.25)),
    (11.44, sound.pop(1047, 0.5)), (11.46, sound.whoosh(0.25, False, 0.25)),
    (12.40, sound.whoosh(0.25, True, 0.3)),
    *[(12.42 + k * 0.033, key(60 + k, 0.2)) for k in range(16)],     # frappe « douane Polynésie »
    (13.00, sound.stamp(0.9)), (13.02, buzz(0.32)),                  # « 0 résultat » + JAMAIS
    (13.78, sound.whoosh(0.25, True, 0.35)), (13.90, sound.whoosh(0.25, True, 0.3)),
    (14.30, sound.whoosh(0.5, True, 0.5)),                           # cercle -> lagon
    (14.66, sound.thud(0.5)), (15.60, sound.whoosh(0.3, False, 0.35)), (15.78, sound.pop(600, 0.5)), (15.80, sound.sparkle(0.22)),
    (16.25, sound.whoosh(0.4, True, 0.35)),
    (17.20, sound.pop(784, 0.5)), (17.45, sound.ding(1568, 0.3, 0.9)), (17.45, confetti(0.18)),
    (18.38, sound.pop(988, 0.5)), (18.63, sound.ding(1760, 0.3, 0.9)), (18.63, confetti(0.18)),
    (19.48, sound.pop(1175, 0.5)), (19.73, sound.ding(1976, 0.32, 1.0)), (19.73, confetti(0.2)),
    (19.92, sound.whoosh(0.45, True, 0.5)),                          # cercle -> fin
    (20.30, sound.whoosh(0.3, False, 0.3)), (20.56, sound.thud(0.7)), (20.58, sound.boing(0.4)), (20.58, confetti(0.32)),
    (21.35, sound.pop(700, 0.45)), (21.40, kaching(0.42)),
]
for t, x in cues: place(fx, x, t)

# musique : ukulélé (boucle « île ») plus rapide + batterie légère, coupée net à la fin de l'intro
BPM = 112; beat = 60 / BPM
music = sound.music_island(TOTAL + 0.5, bpm=BPM, gain=0.15)[:n]
drums = np.zeros(n)
for b in range(int(TOTAL / beat) + 1):
    tb = b * beat
    if tb < 1.7: continue                       # intro sans batterie
    if b % 4 in (0, 2): place(drums, kick(0.55), tb)
    if b % 4 in (1, 3): place(drums, clap(0.28), tb)
    place(drums, hat(0.10), tb + beat / 2); place(drums, hat(0.06), tb)
music = music + drums
env = np.convolve(np.abs(voice), np.ones(int(0.25 * SR)) / int(0.25 * SR), mode="same")
music = music * (1.0 - 0.5 * np.clip(env / 0.05, 0, 1)) * 1.05
fade = np.ones(n); fade[-int(1.2 * SR):] = np.linspace(1, 0, int(1.2 * SR)); music *= fade

mix = voice + fx * 0.55 + music
mix = np.tanh(mix * 1.1) / np.tanh(1.1); mix = mix / (np.abs(mix).max() + 1e-9) * 0.93
st = np.stack([mix, mix], 1)
with wave.open(sys.argv[2], "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())
print("ok", sys.argv[2])
