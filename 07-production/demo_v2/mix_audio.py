#!/usr/bin/env python3
"""Mixage de la démo v2 : voix (déjà générée, aucun nouveau crédit) + musique « île » + bruitages, synthétisés en local.
Usage : python3 mix_audio.py voix.mp3 sortie.wav"""
import subprocess
import sys
import wave

import numpy as np

sys.path.insert(0, str(__import__("pathlib").Path(__file__).resolve().parent.parent / "tools"))
import sound  # noqa: E402

SR = sound.SR
TOTAL = 23.0
VOICE_AT = 0.6


def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768.0


def place(buf, x, t, gain=1.0):
    o = int(t * SR)
    if o >= len(buf):
        return
    e = min(len(x), len(buf) - o)
    buf[o:o + e] += x[:e] * gain


n = int(TOTAL * SR)
voice = np.zeros(n)
v = load(sys.argv[1])
v = v / (np.abs(v).max() + 1e-9) * 0.89
place(voice, v, VOICE_AT)

# --- bruitages, calés sur les mots de la voix (temps absolus)
fx = np.zeros(n)
cues = [
    (0.10, sound.tick(0.5)), (1.76, sound.pop(700, 0.5)), (2.36, sound.pop(980, 0.5)),
    (2.42, sound.whoosh(0.55, True, 0.35)),
    *[(2.48 + k * 0.11, sound.tick(0.35)) for k in range(5)],
    (3.10, sound.pop(1250, 0.4)),
    (4.40, sound.ding(1318.5, 0.42)), (4.46, sound.sparkle(0.25)),
    (5.26, sound.whoosh(0.5, True, 0.5)),
    (5.95, sound.tick(0.4)), (6.50, sound.tick(0.4)), (7.08, sound.thud(0.85)),
    (7.62, sound.whoosh(0.45, False, 0.45)),
    (7.90, sound.tick(0.35)), (8.88, sound.tick(0.35)),
    (10.18, sound.pop(880, 0.5)), (11.44, sound.pop(1047, 0.5)),
    (12.16, sound.whoosh(0.45, True, 0.45)),
    (12.40, sound.tick(0.35)), (13.00, sound.stamp(0.9)), (13.78, sound.ding(880, 0.22, 1.0)),
    (14.36, sound.whoosh(0.75, False, 0.5)),
    (14.70, sound.tick(0.35)), (15.60, sound.sparkle(0.3)),
    (17.20, sound.pop(784, 0.55)), (18.38, sound.pop(988, 0.55)), (19.48, sound.pop(1175, 0.55)), (19.52, sound.sparkle(0.25)),
    (19.96, sound.whoosh(0.5, True, 0.5)),
    (20.42, sound.tick(0.4)), (20.55, sound.boing(0.42)), (21.0, sound.ding(1568, 0.25, 1.4)),
]
for t, x in cues:
    place(fx, x, t)

# --- musique, baissée quand la voix parle (ducking)
music = sound.music_island(TOTAL + 0.5)[:n]
env = np.abs(voice)
k = int(0.25 * SR)
env = np.convolve(env, np.ones(k) / k, mode="same")
duck = 1.0 - 0.45 * np.clip(env / 0.05, 0, 1)
music = music * duck * 1.13

mix = voice + fx * 0.55 + music
mix = np.tanh(mix * 1.1) / np.tanh(1.1)          # limiteur doux
mix = mix / (np.abs(mix).max() + 1e-9) * 0.93
st = np.stack([mix, mix], 1)
with wave.open(sys.argv[2], "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype(np.int16).tobytes())
print("ok", sys.argv[2], round(len(mix) / SR, 2), "s")
