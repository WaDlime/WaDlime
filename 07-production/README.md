# 🎬 07-PRODUCTION — FABRIQUER LES VIDÉOS

La chaîne qui transforme un script voix IA (`06-formation/`) + sa voix off ElevenLabs en **vidéo MP4 prête à publier** (1920×1080, 25 i/s), aux couleurs de la plateforme (anthracite, or, turquoise lagon), avec sous-titres incrustés.

## Ce que fait `render_clip.py`
1. **Transcrit la voix mot à mot** en local (faster-whisper, modèle `small`), sans crédit.
2. **Aligne** la transcription sur le texte du script → chaque mot a son horaire.
3. **Cale les écrans** : chaque écran apparaît au moment où la voix dit sa phrase repère (`"at"` dans le fichier de scènes).
4. **Dessine les écrans** en HTML puis en PNG (Playwright) : titre, phrase forte, liste, chaîne, cartes, tableau, formule, « à retenir », étapes, calculatrice, fin de clip.
5. **Monte** avec ffmpeg : fondus entre les écrans, sous-titres incrustés (calés sur la voix), voix normalisée (−16 LUFS).
6. **Sorties** dans `out/` : `clip.mp4`, `clip.srt` (sous-titres pour CapCut), les PNG des écrans.

## Utilisation
```bash
# une fois : l'aligneur
python3 -m venv .venv && .venv/bin/pip install faster-whisper

# rendre une vidéo
.venv/bin/python 07-production/render_clip.py 07-production/scenes/m00_c1_chaine.json voix_0.1.mp3 07-production/out

# juste les écrans (planche contact, sans voix) pour valider le visuel
python3 07-production/render_clip.py 07-production/scenes/m00_c1_chaine.json --storyboard 07-production/out
```

## Le fichier de scènes (`scenes/*.json`)
- `voice_from` : le script du module et le numéro du clip → le texte de la voix est lu directement dans `06-formation/` (une seule source de vérité).
- `beats` : la liste des écrans. Le premier s'affiche au début ; chacun des suivants s'affiche quand la voix prononce sa phrase `"at"` (copiée du script, sans les balises).
- Dans les textes : `**mot**` = en or, `~~mot~~` = en corail.

## La voix
- ElevenLabs, voix **« Bastien »** (`69ujSsYIBOGW4duCBBSW`), modèle `eleven_v4`, une version par clip.
- Flow ElevenLabs du module 00 : `CwaGI3jjBVwEMr0h9pVC`.
- ⚠️ **Formule gratuite** : 10 000 crédits par mois (≈ 1 crédit par caractère), générations parfois saturées, et **pas de licence commerciale**. Pour vendre la formation, les voix finales doivent être générées avec une formule payante (Starter minimum, licence valable pour l'audio généré pendant l'abonnement).
- Ordre de grandeur : ~8 300 caractères par module → ~133 000 pour toute la formation (≈ 2 h 15 de voix).

## Avancement
| Clip | Scènes | Voix | Vidéo |
|---|---|---|---|
| Démo (début du 4.0) | `scenes/demo_04_0_extrait.json` | ✅ extrait de test | ✅ |
| 0.0 à 0.4 | ✅ `scenes/m00_*.json` | ⏳ génération saturée le 17/11 | ⏳ |
| 1.0 à 1.6 | ⏳ | ⏳ (quota gratuit insuffisant ce mois-ci) | ⏳ |
