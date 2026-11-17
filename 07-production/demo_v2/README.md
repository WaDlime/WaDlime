# 🎬 DÉMO V2 — LE STYLE PREMIUM (cartes éditoriales + scènes 3D)

Refonte de la démo du clip 4.0 demandée le 17/11/2026 : « chaque propos doit être visuel », bruitages, qualité premium.
Elle reprend la voix « Bastien » déjà générée (`05-previews/…extrait_Bastien.mp3`) : **aucun crédit ElevenLabs en plus**.

## Les deux modèles visuels
- **Modèle A — éditorial** (inspiré de la référence « Did you know ») : fond crème à points, gros titre noir + mot clé en italique doré, cartes illustrées en éventail, puce `modules : 16`. Pour les accroches, les chapitres et les fins de clip.
- **Modèle B — scène 3D** (inspiré de la référence low-poly) : le personnage polynésien dans son décor, une carte crème de texte qui rebondit, tampons, anneaux qui pointent l'image, sous-titres mot à mot. Pour raconter et expliquer.
- Fils rouges : la **mascotte « colis »** (fleur de tiare), les couleurs or / corail / lagon, le grain léger.

Images fixes : `photos/Modele_A_editorial_cartes.png` et `photos/Modele_B_scene_3D.png`.

## Comment c'est fabriqué
1. **Illustrations** : Higgsfield, modèle `z_image` (0,15 crédit l'image, 2048 px). 14 images, environ 2,1 crédits. Les objets (mascotte, icônes) sont générés sur fond vert puis détourés en local (`tools/keyout.py`, option `--shadow` pour la mascotte).
2. **Animation** : `scene.html`, une page dont `renderAt(t)` place chaque élément à l'instant `t` (cartes, mouvements de caméra, tampons, éclats, poussières dorées, sous-titres mot à mot calés sur la voix). `render_frames.js` la capture à 30 images par seconde.
3. **Son** : `mix_audio.py` = voix + musique « île » (ukulélé synthétisé, baissée sous la voix) + bruitages synthétisés (`tools/sound.py` : whoosh, pop, ding, éclats, choc, tampon, boing). Tout est fait en local, sans droits tiers.
4. **Montage** : ffmpeg (H.264, son normalisé à −16 LUFS).

```bash
node render_frames.js scene.html frames 30 23.0
python3 mix_audio.py ../../05-previews/Module_04_clip_4.0_extrait_Bastien.mp3 mix.wav
ffmpeg -framerate 30 -i frames/f_%05d.jpg -i mix.wav -c:v libx264 -crf 18 -pix_fmt yuv420p \
  -af loudnorm=I=-16:TP=-1.5:LRA=11 -c:a aac -b:a 192k -shortest -movflags +faststart ../out/Demo_v2.mp4
node stills.js scene.html photos/modele 5.2 14.1      # les deux images modèles
```

## Limites actuelles (formules gratuites)
- **Higgsfield gratuit** : 10 crédits, seuls les modèles d'entrée de gamme sont ouverts (`z_image` ; GPT Image demande une formule payante), générations une par une (limite de débit). Pas d'animation vidéo par IA (10 à 35 crédits les 5 secondes).
- **Cohérence du personnage** : `z_image` n'accepte pas d'image de référence ; le personnage est décrit pareil dans chaque prompt. Pour 16 modules, une formule payante (références d'image ou personnage entraîné) garantira un personnage identique partout.
- **Musique** : synthétisée en local ; elle peut être remplacée par une musique libre de droits de la bibliothèque CapCut.
