#!/usr/bin/env python3
"""Bruitages et musique synthétisés en local (aucun crédit, aucun droit tiers).
Fonctions : whoosh, pop, ding, sparkle, thud, stamp, boing, tick, riser + music_island()."""
import numpy as np

SR = 44100


def env_adsr(n, a=0.005, d=0.05, s=0.6, r=0.2):
    t = np.arange(n) / SR
    e = np.ones(n)
    A, D, R = int(a * SR), int(d * SR), int(r * SR)
    e[:A] = np.linspace(0, 1, max(A, 1))[:len(e[:A])]
    e[A:A + D] = np.linspace(1, s, max(D, 1))[:len(e[A:A + D])]
    if R > 0:
        e[-R:] *= np.linspace(1, 0, R)
    return e


def lowpass(x, cutoff):
    """Filtre passe-bas 1 pôle (cutoff scalaire ou tableau)."""
    cutoff = np.broadcast_to(np.asarray(cutoff, float), x.shape)
    y = np.zeros_like(x); prev = 0.0
    k = 1 - np.exp(-2 * np.pi * cutoff / SR)
    for i in range(len(x)):
        prev += k[i] * (x[i] - prev); y[i] = prev
    return y


def whoosh(dur=0.5, up=True, gain=0.5):
    n = int(dur * SR); rng = np.random.default_rng(1)
    noise = rng.standard_normal(n)
    sweep = np.geomspace(300, 4200, n) if up else np.geomspace(4200, 300, n)
    hp = noise - lowpass(noise, sweep * 0.35)
    band = lowpass(hp, sweep)
    t = np.linspace(0, 1, n)
    e = np.sin(np.pi * t) ** 1.6
    return band / (np.abs(band).max() + 1e-9) * e * gain


def pop(f0=880, gain=0.45):
    n = int(0.12 * SR); t = np.arange(n) / SR
    f = f0 * np.exp(-t * 18) + f0 * 0.35
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 34) * gain


def ding(f0=1318.5, gain=0.35, dur=1.6):
    n = int(dur * SR); t = np.arange(n) / SR
    y = sum(a * np.sin(2 * np.pi * f0 * m * t) * np.exp(-t * dcy)
            for m, a, dcy in [(1, 1.0, 3.2), (2.0, 0.35, 5.5), (2.76, 0.25, 7), (5.4, 0.12, 11)])
    return y * gain * np.minimum(1, t / 0.003)


def sparkle(gain=0.22):
    out = np.zeros(int(0.6 * SR))
    for k, f in enumerate([2093, 2637, 3136, 3951, 4186]):
        b = ding(f, 1.0, 0.35)
        o = int(k * 0.055 * SR); out[o:o + len(b)] += b[:len(out) - o] * (0.9 - k * 0.1)
    return out / np.abs(out).max() * gain


def thud(gain=0.8):
    n = int(0.45 * SR); t = np.arange(n) / SR
    f = 110 * np.exp(-t * 9) + 42
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)
    rng = np.random.default_rng(3)
    click = lowpass(rng.standard_normal(n), 900) * np.exp(-t * 60) * 0.8
    y = body + click
    return y / np.abs(y).max() * gain


def stamp(gain=0.8):
    a = thud(0.7)[: int(0.3 * SR)]
    n = len(a); t = np.arange(n) / SR
    rng = np.random.default_rng(5)
    slap = (rng.standard_normal(n) - lowpass(rng.standard_normal(n), 1500)) * np.exp(-t * 80) * 0.6
    y = a + slap
    return y / np.abs(y).max() * gain


def boing(gain=0.35):
    n = int(0.55 * SR); t = np.arange(n) / SR
    f = 220 + 380 * (1 - np.exp(-t * 7)) + 35 * np.sin(2 * np.pi * 16 * t) * np.exp(-t * 4)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5.5) * gain


def tick(gain=0.25):
    n = int(0.03 * SR); t = np.arange(n) / SR
    rng = np.random.default_rng(7)
    return (rng.standard_normal(n) - lowpass(rng.standard_normal(n), 3000)) * np.exp(-t * 300) * gain


def riser(dur=1.2, gain=0.25):
    n = int(dur * SR); t = np.linspace(0, 1, n)
    rng = np.random.default_rng(9)
    noise = rng.standard_normal(n)
    y = lowpass(noise, np.geomspace(400, 9000, n)) * t ** 2
    tone = np.sin(2 * np.pi * np.cumsum(np.geomspace(220, 880, n)) / SR) * t ** 2 * 0.3
    y = y / np.abs(y).max() + tone
    return y / np.abs(y).max() * gain


# ------------------------------------------------------------------ musique « île » (ukulélé Karplus-Strong)
def pluck(freq, dur, bright=0.5, seed=0):
    n = int(dur * SR); period = int(SR / freq)
    rng = np.random.default_rng(seed)
    buf = rng.uniform(-1, 1, period) * 0.5
    buf = lowpass(np.concatenate([buf] * 2), 2000 + 6000 * bright)[period:]
    out = np.zeros(n); idx = 0
    for i in range(n):
        out[i] = buf[idx]
        nxt = (idx + 1) % period
        buf[idx] = 0.4985 * (buf[idx] + buf[nxt])
        idx = nxt
    t = np.arange(n) / SR
    return out * np.minimum(1, t / 0.002)


def note(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def music_island(seconds, bpm=96, gain=0.16):
    """Boucle douce : ukulélé (accords C-G-Am-F), basse ronde, shaker. Fondu d'entrée/sortie."""
    beat = 60 / bpm
    n = int(seconds * SR)
    out = np.zeros(n + SR * 2)
    chords = [[60, 64, 67, 72], [59, 62, 67, 71], [57, 60, 64, 69], [57, 60, 65, 69]]   # C, G/B, Am, F
    roots = [48, 43, 45, 41]
    strum = [0, 1.5, 2, 2.5, 3.5]          # motif de grattage (en temps)
    bars = int(seconds / (4 * beat)) + 2
    seed = 0
    for bar in range(bars):
        c = chords[bar % 4]
        for k, st in enumerate(strum):
            t0 = (bar * 4 + st) * beat
            down = k % 2 == 0
            for j, m in enumerate(c if down else c[::-1]):
                seed += 1
                s = pluck(note(m), 1.2, bright=0.45 if down else 0.3, seed=seed) * (0.32 if down else 0.22)
                o = int((t0 + j * 0.012) * SR)
                if o < len(out):
                    e = min(len(s), len(out) - o); out[o:o + e] += s[:e]
        # basse : ronde, deux notes par mesure
        for st in (0, 2):
            t0 = (bar * 4 + st) * beat
            f = note(roots[bar % 4])
            ln = int(beat * 1.8 * SR); t = np.arange(ln) / SR
            b = np.sin(2 * np.pi * f * t) * np.exp(-t * 2.2) * 0.5 + np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 4) * 0.1
            o = int(t0 * SR)
            if o < len(out):
                e = min(ln, len(out) - o); out[o:o + e] += b[:e]
        # shaker en croches
        for k in range(8):
            t0 = (bar * 4 + k * 0.5) * beat
            sh = tick(0.18 if k % 2 else 0.1)
            sh = np.concatenate([sh, np.zeros(int(0.05 * SR))])
            sh = lowpass(np.random.default_rng(k + bar).standard_normal(int(0.06 * SR)), 9000)
            sh = (sh - lowpass(sh, 5000)) * np.exp(-np.arange(len(sh)) / SR * 70) * (0.12 if k % 2 else 0.07)
            o = int(t0 * SR)
            if o < len(out):
                e = min(len(sh), len(out) - o); out[o:o + e] += sh[:e]
    out = out[:n]
    out = out / (np.abs(out).max() + 1e-9)
    fade = int(1.2 * SR)
    out[:int(0.4 * SR)] *= np.linspace(0, 1, int(0.4 * SR))
    out[-fade:] *= np.linspace(1, 0, fade)
    return out * gain
