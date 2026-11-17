#!/usr/bin/env python3
"""Détoure un objet généré sur fond vert uni : masque par teinte (fond échantillonné sur les bords),
bords adoucis, suppression du reflet vert. Usage : keyout.py entree.png sortie.png [--shadow]"""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
SHADOW = "--shadow" in sys.argv[3:]   # enlève aussi les ombres portées bleu-vert (à réserver aux sujets sans bleu)
im = Image.open(src).convert("RGB")
a = np.asarray(im).astype(np.float32) / 255.0
hsv = np.asarray(im.convert("HSV")).astype(np.float32)
h, s, v = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255, hsv[..., 2] / 255

border = np.concatenate([hsv[:8].reshape(-1, 3), hsv[-8:].reshape(-1, 3), hsv[:, :8].reshape(-1, 3), hsv[:, -8:].reshape(-1, 3)])
bg_h = float(np.median(border[:, 0])) * 360 / 255
dh = np.abs(((h - bg_h + 180) % 360) - 180)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
MAGENTA = 250 < bg_h < 345                            # fond magenta : pour les sujets verts (billets…)
green_dom = (np.minimum(r, b) - g) if MAGENTA else (g - np.maximum(r, b))   # dominance de la couleur du fond
score = np.clip((24 - dh) / 10, 0, 1) * np.clip((s - 0.12) / 0.12, 0, 1) * np.clip(green_dom / 0.06, 0, 1)
# ombres portées sur le fond : même teinte, plus sombres, moins saturées
bg_v = float(np.median(border[:, 2])) / 255
in_hue = ((h > 105) & (h < 220)).astype(np.float32)
shadow = in_hue * np.clip((bg_v * 0.95 - v) / 0.08, 0, 1) * np.clip((s - 0.04) / 0.05, 0, 1) * np.clip((g - r) / 0.04, 0, 1)
if SHADOW:
    score = np.maximum(score, shadow * 0.97)
# le fond = zones vertes reliées aux bords (le vert à l'intérieur d'un objet, ex. un écran, est gardé)
from collections import deque as _dq
bgm = score > 0.35
st = 4
sm = bgm[::st, ::st]
seen = np.zeros(sm.shape, bool)
q = _dq([(y, x) for y in range(sm.shape[0]) for x in (0, sm.shape[1] - 1) if sm[y, x]] +
        [(y, x) for x in range(sm.shape[1]) for y in (0, sm.shape[0] - 1) if sm[y, x]])
for y, x in q:
    seen[y, x] = True
while q:
    y, x = q.popleft()
    for yy, xx in ((y+1, x), (y-1, x), (y, x+1), (y, x-1)):
        if 0 <= yy < sm.shape[0] and 0 <= xx < sm.shape[1] and sm[yy, xx] and not seen[yy, xx]:
            seen[yy, xx] = True; q.append((yy, xx))
conn = np.kron(seen, np.ones((st, st), bool))[:score.shape[0], :score.shape[1]]
conn = np.asarray(Image.fromarray((conn * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(9))) > 127
alpha = 1.0 - score * conn
mask = Image.fromarray((alpha * 255).astype(np.uint8))
mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
alpha = np.asarray(mask).astype(np.float32) / 255.0

# garde la plus grande composante (enlève les poussières), via remplissage simple
from collections import deque
solid = alpha > 0.5
H, W = solid.shape
best, best_n, cur, sizes = 0, 0, 0, {}
step = 4  # sous-échantillonnage pour aller vite
small = solid[::step, ::step]; lab = np.zeros(small.shape, np.int32)
for y0 in range(small.shape[0]):
    for x0 in range(small.shape[1]):
        if small[y0, x0] and not lab[y0, x0]:
            cur += 1; n = 0; q = deque([(y0, x0)]); lab[y0, x0] = cur
            while q:
                y, x = q.popleft(); n += 1
                for yy, xx in ((y+1, x), (y-1, x), (y, x+1), (y, x-1)):
                    if 0 <= yy < small.shape[0] and 0 <= xx < small.shape[1] and small[yy, xx] and not lab[yy, xx]:
                        lab[yy, xx] = cur; q.append((yy, xx))
            sizes[cur] = n
            if n > best_n: best, best_n = cur, n
dh_small, gd_small = dh[::step, ::step], green_dom[::step, ::step]
def greenish(k):  # ombres et restes de fond : morceaux de la même teinte que le fond
    sel = lab == k
    return float(np.median(dh_small[sel])) < 16 and float(gd_small[sel].mean()) > 0.015
big = [k for k, n in sizes.items() if (k == best or n >= 0.04 * best_n) and not (k != best and greenish(k))]
keep = np.kron(np.isin(lab, big), np.ones((step, step), bool))[:H, :W]
keep_img = Image.fromarray((keep * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(2))
alpha = alpha * (np.asarray(keep_img).astype(np.float32) / 255.0)

# suppression du reflet vert sur les bords
if MAGENTA:
    spill = np.clip(np.minimum(r, b) - g, 0, None)
    out = np.dstack([r - spill * 0.85, g, b - spill * 0.85, alpha])
else:
    spill = np.clip(g - np.maximum(r, b), 0, None)
    out = np.dstack([r, g - spill * 0.85, b, alpha])
img = Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8), "RGBA")
bbox = img.getchannel("A").point(lambda p: 255 if p > 8 else 0).getbbox()
img = img.crop(bbox) if bbox else img
img.save(dst)
print(dst, img.size, f"fond teinte {bg_h:.0f}°")
