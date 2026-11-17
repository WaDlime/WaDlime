# 🎬 DÉMO V4 — la DA cartoon rétro en finition « moderne / premium »

Même DA, mêmes images (`../assets_v3/`), même voix et même mixage (`../demo_v2/mix.wav`) que la v3 : **aucun crédit**.

## Ce qui change par rapport à la v3
- **60 images/s** et animations **à ressort** (rebond amorti) au lieu d'easing simple.
- **Titres lettre par lettre** en relief plein (extrusion noire), façon affiche.
- **Transitions** : bandes de couleur qui balaient l'écran, travelling avec flou de mouvement (filtre SVG), zoom flouté, ouverture en **iris doré** sur l'affiche de fin.
- **Rayons rétro** qui tournent derrière la couverture et l'affiche de fin.
- **Sous-titres modernes** : mots qui s'allument au fil de la voix, **pastille dorée** qui glisse sous le mot dit.
- **Bandeau « MODULE 04 · LA DOUANE »** + **barre de progression** dorée.
- Reflets de lumière sur les cases, ondes autour des cercles, numéros 1-2-3, particules dorées, vignettage, trame « halftone ».
- Mascotte **frégate capitaine** : chute, écrasement à l'atterrissage, nuages de poussière, respiration.

```bash
node ../demo_v2/render_frames.js scene.html frames 60 23.0
ffmpeg -framerate 60 -i frames/f_%05d.jpg -i ../demo_v2/mix.wav -c:v libx264 -crf 17 -preset slow -pix_fmt yuv420p \
  -af loudnorm=I=-16:TP=-1.5:LRA=11 -c:a aac -b:a 192k -shortest -movflags +faststart ../out/Demo_v4_premium.mp4
```
