# 🤝 PASSATION — POUR CLAUDE CODE DESKTOP
### Projet « Import Mastery — Fenua Edition » · conversation de travail des 16 et 17/11/2026 (session Claude Code dans le cloud)

---

## 0. LIS ÇA EN PREMIER

- Ce fichier résume **toute la conversation** entre Naikishan et Claude dans la session cloud : ce qu'on a fait, ce qu'on a décidé, **pourquoi**, ce qui a été refusé, et ce qui reste à faire.
- La mémoire courante du projet est dans **`CLAUDE.md`** (règles, gamme, faits vérifiés, avancement). Pour les règles, `CLAUDE.md` fait foi ; pour l'historique et le contexte, c'est ce fichier.
- **Ordre de lecture conseillé** : `CLAUDE.md` → ce fichier → `01-blueprint/PLAN_Gamme_et_Sommaire.md` → `06-formation/README.md` → `07-production/demo_v2/README.md`.
- ✅ **Tout le travail est sur GitHub** : dépôt `WaDlime/WaDlime`, branche **`claude/new-session-4nc7lt`**. Le push a échoué en 403 pendant toute la session, puis a fonctionné à la fin, le 17/11. Pour la récupérer : `git clone https://github.com/WaDlime/WaDlime.git`, puis `git checkout claude/new-session-4nc7lt`. Aucune pull request n'a été créée.
- Les **vidéos produites** (`07-production/out/`) ne sont **pas dans git** (trop lourdes). La démo v2 a été envoyée à Naikishan dans la conversation : à copier dans `07-production/out/` si besoin. Le reste se régénère avec les scripts (voir la section 7).
- Les connecteurs **ElevenLabs** et **Higgsfield** étaient branchés dans la session cloud. Vérifie qu'ils le sont aussi dans Claude Code Desktop avant de compter dessus.

---

## 1. QUI EST NAIKISHAN, ET COMMENT TRAVAILLER AVEC LUI

- **Naikishan**, à Papeete (Tahiti). Il a deux boutiques sur Facebook : **Opu Ara Store** (tech, montres, accessoires, notamment des montres **Skmei**) et **Te Naiki Nui** (bijoux). Il travaille avec une petite équipe.
- **Objectif** : vendre une formation premium pour apprendre à **importer de Chine vers la Polynésie et revendre sur place**, puis un accompagnement. Il veut gagner de l'argent **en donnant plus que le prix payé** : des clients satisfaits qui reviennent.
- **Langue** : français familier, souvent **en dictée vocale**, donc les noms propres arrivent déformés :
  - « Hisfield », « Hillfield » = **Higgsfield** ;
  - « Tenei Kinui », « Tene Kinui » = **Te Naiki Nui** ;
  - « Neiki-san » = **Naikishan** ;
  - « Escamé » = **Skmei**.
- **Ce qu'il attend** : des réponses structurées, actionnables, sans blabla. Il tranche vite et sait ce qu'il veut. Il est **très exigeant sur la qualité** (« pour le prix qu'on vend cette formation… »).
- Il suit souvent la session **depuis son téléphone**. Livre-lui des fichiers (MP4, PNG, MD) ou des pages web plutôt que du texte brut.
- **Tout le contenu de la formation** s'écrit en français oral et décontracté (« t'as », « genre », « balles »).

---

## 2. LA CONVERSATION, ÉTAPE PAR ÉTAPE

### Étape 1 — Import du projet (16/11)
- Naikishan envoie un zip `import-mastery-formation` : `CLAUDE.md`, le blueprint (`01-blueprint/Formation_Import_Chine_Tahiti_BLUEPRINT.md`), le sommaire et les **14 scripts vidéo** (`02-scripts-video/`), une **version voix IA du module 00** (`03-voix-ia/`) et l'**app React gamifiée** (`04-plateforme/import-mastery-academy.jsx`).
- Le dépôt était vide : tout a été importé à la racine. Le push a été **refusé (403)** pendant toute la session ; il n'a fonctionné qu'à la toute fin, le 17/11.

### Étape 2 — Priorité au contenu : le module douane (16/11)
- Naikishan : « Je veux travailler d'abord sur la formation, le contenu, c'est le plus important. »
- Le **module 04 (douane)** a été converti au format voix IA (8 clips), **après vérification des faits sur les sites officiels** (Douane PF, DICP). Corrections apportées :
  - la **TVA se calcule en cascade** sur la valeur CAF + les droits + les autres taxes ;
  - TVA à **16 %** sur la plupart des marchandises, **5 %** sur l'alimentaire, **0 %** sur certains produits de première nécessité ; le taux de **13 %** concerne les **services**, pas les marchandises ;
  - la **franchise colis** est réservée aux **particuliers** (usage perso et occasionnel) : jusqu'à **20 000 XPF**, puis un forfait de **20 % (UE) ou 30 % (hors UE)** jusqu'à 50 000 XPF ;
  - **FENIX** (FENua Import eXport) est en service **depuis 2019** ; on y déclare soi-même avec une convention.
- Le script vidéo d'origine du module 04 a été corrigé de la même façon.

### Étape 3 — Première preview de voix (16/11)
- « Génère moi une preview » → **20 secondes** générées sur ElevenLabs avec la voix « **Bastien** » (modèle `eleven_v4`) : `05-previews/Module_04_clip_4.0_extrait_Bastien.mp3`. Elle a coûté 422 crédits du compte gratuit.

### Étape 4 — La vision de la gamme (17/11)
- Naikishan décrit sa vision :
  - une formation 1 « **Savoir importer** » pour le grand public, pas forcément pour faire un business ;
  - une formation 2 « **Créer ton business d'import** » (trouver quoi vendre, Meta Ads, affiches, IA) ;
  - un **accompagnement** d'une dizaine d'élèves jusqu'à leur premier revenu, avec des outils et techniques exclusifs ;
  - plus tard, des **outils bonus** : gestionnaire de stock, compta (sur la base de l'outil fait pour Te Naiki Nui), calculateur de douane.
- Claude a rédigé le **plan v1** avec les faits vérifiés pour les particuliers : biosécurité, produits réglementés, téléservice « Je déclare ». Il en a fait une **page web** (privée) : https://claude.ai/artifact/Rji7QZiho7Q2kLkarV73Rj

### Étape 5 — Naikishan remet en cause la formation 1 → fusion (17/11)
- **Son objection** : vendre « Savoir importer » au grand public, c'est apprendre aux clients des revendeurs à se passer d'eux. Ça va contre ses boutiques et contre les élèves de la formation 2 (« pas très honnête »), et les clients n'achèteraient que la formation la moins chère.
- **Décision : fusion.** Une **formation unique** (« Créer ton business d'import au fenua ») + l'**accompagnement**, précédés d'une **entrée gratuite** (posts, PDF « Les 5 erreurs… », extrait du module douane, toujours adressés à de **futurs vendeurs**).
- **Nuance apportée par Claude et retenue** : savoir importer ne tue pas les revendeurs. Un revendeur local vend aussi la rapidité, la confiance, la garantie, le conseil et la livraison. Le problème de la v1, c'était la cible et la promesse.
- **Idées ajoutées** : une leçon « **Pourquoi on achète chez toi plutôt que sur Shein** », et plus tard des **achats groupés** pour les anciens élèves (à étudier).
- Le plan est devenu `01-blueprint/PLAN_Gamme_et_Sommaire.md` (v2). La page web a été mise à jour.

### Étape 6 — Ordre des modules, ligne rouge, voix validée (17/11)
- Naikishan **refuse de mettre « Te mettre en règle » au début** : « ça bloque, tout le monde déteste faire des papiers, c'est ce qui m'a bloqué au début ». → **Ce module devient le 08**, au début de la partie « Vendre ».
- Il proposait de **« tester un marché avec des colis perso »** sans papiers. **Refusé** et expliqué : la franchise est réservée à un usage perso et occasionnel, et le module douane lui-même dit que faire passer du stock à revendre pour du perso, c'est une fausse déclaration. → La **« ligne rouge avant les papiers »** a été écrite :
  - avant le module 08, l'élève apprend, commande 1 ou 2 pièces **pour lui** et teste l'intérêt **sans encaisser** ;
  - dès qu'il encaisse ou importe du stock à revendre : papiers et import pro.
- **Voix « Bastien » validée** : « une voix très claire, j'aime bien ».
- **Module 07 (cas réel)** : ce sera **sa propre démo filmée**. Il enverra ses captures et ses chiffres.
- Ensuite, Claude a écrit le **module 05 « Produits interdits et réglementés »**, nouveau, après recherches officielles :
  - la biosécurité, refondue le 16/03/2026 ;
  - les contrefaçons ;
  - les appareils radio (autorisation AAI de l'ANFR) ;
  - les espèces protégées (CITES, y compris les bracelets de montre) ;
  - les **perles de culture, interdites à l'import**, un point crucial pour les bijoux.
- Les modules 00 et 04 ont été déplacés dans `06-formation/`, avec un `README.md`. Le plan est passé en **v2.1**.

### Étape 7 — « Crée les vidéos de la partie 1 » (17/11)
- Naikishan a installé **CapCut sur son ordinateur**. Il n'y a **aucun connecteur CapCut** dans la session : on lui livre des MP4 finis et les fichiers de sous-titres.
- **ElevenLabs gratuit** : 10 000 crédits par mois. Les 5 générations du module 00 ont été **refusées** (« Free generations are busy »), sans frais.
- Claude a écrit le **script voix IA du module 01** (7 clips) et construit une première chaîne vidéo (`07-production/render_clip.py`) : alignement mot à mot en local (faster-whisper), écrans HTML, montage ffmpeg et sous-titres. Il a produit une démo de 22 s sur l'extrait de voix existant, et les storyboards du module 00.
- Points découverts :
  - **la formule gratuite d'ElevenLabs n'a pas de licence commerciale** ; il faut la formule Starter minimum, autour de 5 à 6 $ par mois (à revérifier) ;
  - toute la formation représente environ **133 000 caractères** de voix (environ 2 h 15).

### Étape 8 — « Pas satisfait » → démo v2 premium (17/11)
- **Retour de Naikishan** : le style « diapos » n'est **pas au niveau premium** attendu.
- Il envoie **deux références TikTok** :
  - un reel éditorial « Did you know » : fond crème à points, gros titre noir avec des mots en italique, cartes illustrées en éventail ;
  - une scène **3D low-poly** : un personnage à son bureau, une mascotte, des sous-titres.
- **Ses demandes** :
  - deux « photos » modèles applicables à nos vidéos ;
  - refaire la vidéo avec de nouvelles animations, **sans dépenser de crédits ElevenLabs** ;
  - **utiliser Higgsfield** pour les images ;
  - **chaque propos doit être visuel** (« on retient mieux avec la dopamine, visuellement ») ;
  - des **bruitages** ;
  - « un plaisir de regarder, donc un plaisir d'apprendre ».
- **Ce que Higgsfield gratuit permet** :
  - 10 crédits au départ ;
  - **GPT Image est bloqué** (« Requires basic plan ») ;
  - **`z_image`** est ouvert, à 0,15 crédit l'image, en 2048 px, avec un très bon rendu 3D stylisé ;
  - l'animation vidéo par IA coûte 10 à 35 crédits pour 5 s, donc elle est hors budget ;
  - la musique coûte 4,36 crédits pour 30 s, donc elle est faite en local.
- **Résultat** :
  - la vidéo **`07-production/out/Demo_v2_douane_premium.mp4`** (23 s) ;
  - **`07-production/demo_v2/photos/Modele_A_editorial_cartes.png`** et **`Modele_B_scene_3D.png`** ;
  - **14 illustrations** Higgsfield pour **2,1 crédits** ; il en reste **7,9** ;
  - **aucun crédit ElevenLabs** : la voix existante a été réutilisée ;
  - une **mascotte « colis » avec une fleur de tiare**, créée pour le projet (on n'a pas repris la mascotte ni le logo vus dans les références, qui appartiennent à une autre marque).

### Étape 9 — Rappel automatique non exécuté (17/11)
- Claude avait programmé un nouvel essai de génération des voix ElevenLabs du module 00. Il s'est déclenché après la consigne « plus de crédits ElevenLabs » : **il n'a pas été exécuté**, puis il a été supprimé.

### Étape 10 — Cette passation (17/11)

---

## 3. OÙ ON EN EST (17/11/2026)

### Fait
| Quoi | Où |
|---|---|
| Gamme et sommaire en 16 modules (v2.1), faits douane vérifiés, ligne rouge | `01-blueprint/PLAN_Gamme_et_Sommaire.md` |
| Scripts voix IA **prêts** : modules 00, 01, 04 ; module 05 **écrit**, avec des points 🔎 à vérifier | `06-formation/Module_00…`, `_01…`, `_04…`, `_05…` |
| Mode d'emploi des scripts, voix, ligne rouge, avancement | `06-formation/README.md` |
| Démo v2 premium (23 s) et ses 2 images modèles | `07-production/out/Demo_v2_douane_premium.mp4`, `07-production/demo_v2/photos/` |
| Moteur de la démo v2 (animation image par image, son) | `07-production/demo_v2/` |
| Illustrations Higgsfield et détourages | `07-production/assets_hf/` |
| Ancienne chaîne « diapos » (rejetée, mais son alignement est réutilisable) | `07-production/render_clip.py`, `07-production/scenes/` |

### En attente de réponse de Naikishan
1. **Valide-t-il la démo v2 et les modèles A et B ?** Quels ajustements veut-il (rythme, musique, taille des sous-titres, mascotte) ?
2. **Avec quoi fait-on les voix des modules ?** Il ne veut plus dépenser de crédits ElevenLabs sans accord. Options : ElevenLabs payant (on garde « Bastien », licence commerciale), cloner sa propre voix (formule payante), ou une autre solution.
3. **Quel budget d'illustrations ?** Compter environ 10 images par clip, soit à peu près 140 crédits Higgsfield pour les 93 vidéos. Il faudra une formule payante, ou avancer petit à petit.
4. **La démo du module 07** : il doit envoyer ses captures et ses chiffres.

---

## 4. DÉCISIONS VALIDÉES ET CHOSES REFUSÉES

### ✅ Validé par Naikishan
- **Gamme** : entrée gratuite → formation unique « Créer ton business d'import au fenua » (16 modules, 4 parties) → accompagnement (une dizaine d'élèves). Outils bonus plus tard.
- **« Te mettre en règle » en module 08**, au début de la partie « Vendre ».
- **Voix « Bastien »** (ElevenLabs, voice_id `69ujSsYIBOGW4duCBBSW`, modèle `eleven_v4`).
- **Module 07** = sa propre démo filmée.

### ❌ Refusé ou abandonné (ne pas reproposer)
- Une formation « Savoir importer » pour le grand public, et toute promesse du type « économise en important toi-même ».
- Mettre l'administratif au début de la formation.
- « Tester un marché avec des colis perso » : c'est illégal, et contraire au module douane.
- Le style vidéo « diapos » de `render_clip.py`, jugé pas assez premium.
- Les photos produits générées par IA pour les posts test. On utilise la photo du fournisseur, dans un post honnête (« Bientôt dispo, ça t'intéresse ? »).
- Les statistiques inventées (« 90 % des débutants ») : on écrit « la plupart des débutants ».
- La mascotte et le logo vus dans les références TikTok, qui appartiennent à une autre marque : jamais les reprendre.
- **Dépenser des crédits ElevenLabs** sans un nouvel accord explicite.

---

## 5. LES RÈGLES À NE JAMAIS OUBLIER

1. **Exactitude douane et fiscalité** : vérifier sur les sites officiels (Douane PF, DICP, CCISM, DGAE, Biosécurité). Toujours renvoyer au simulateur des droits et taxes. Les fourchettes sont des ordres de grandeur. Le créateur le dit dans les vidéos : il n'est ni douanier ni conseiller fiscal.
2. **Éthique** : pas de sous-déclaration, pas de contrefaçon, pas de faux avis, pas de visuel IA trompeur.
3. **Ligne rouge « avant les papiers »** (voir l'étape 6).
4. **Toujours parler à de futurs vendeurs**, jamais au grand public qui voudrait juste économiser.
5. **Demander avant toute dépense** de crédits (ElevenLabs, Higgsfield), en donnant le coût.
6. **Le style vidéo v2** : chaque phrase est illustrée, avec des bruitages, une musique douce baissée sous la voix, des sous-titres mot à mot et la mascotte « colis ». Le détail est dans la section « Direction visuelle » de `CLAUDE.md`.

---

## 6. COMPTES, CRÉDITS ET OUTILS

| Outil | État au 17/11 | À savoir |
|---|---|---|
| **ElevenLabs** | Formule **gratuite** : 10 000 crédits par mois (environ 1 crédit par caractère), remise à zéro vers le 18/12 | **Pas de licence commerciale** en gratuit. Générations souvent saturées. Voix « Bastien » `69ujSsYIBOGW4duCBBSW`, `eleven_v4`, `generations_count: 1`. Flow de la preview : `RsOpg9vP0aPJJbFm2yT6` ; flow du module 00 : `CwaGI3jjBVwEMr0h9pVC` (vide). **Consigne : plus de crédits sans accord.** |
| **Higgsfield** | Formule **gratuite**, **7,9 crédits** | Seul **`z_image`** est ouvert (0,15 crédit, 2048 px, pas d'image de référence). Bloqués : GPT Image 2.6 (0,25 à 2,75 crédits en payant). Autres prix : nano_banana 1, nano_banana_2 1,5, seedream 5.5 2,5 ; vidéo kling3_0 5 s = 10, seedance 2.5 5 s = 35 ; musique 30 s = 4,36. **Une génération à la fois** (sinon erreur 429). Pas de générations illimitées. |
| **CapCut** | Installé sur l'ordinateur de Naikishan | Pas de connecteur : on livre des MP4 et des SRT, il retouche lui-même. Sa bibliothèque musicale peut remplacer la musique synthétisée. |
| **GitHub** | Push fonctionnel depuis la fin de la session (17/11), refusé en 403 avant | Branche de travail : `claude/new-session-4nc7lt` (pas de pull request). En cas de nouveau 403 : reconnecter GitHub sur claude.ai/connect-github ou installer l'app Claude GitHub sur le dépôt. |

**Outils techniques** (préinstallés dans le cloud, à installer sur l'ordinateur) :
- ffmpeg compilé avec libass ;
- Node.js et Playwright (Chromium) ;
- Python 3 avec `numpy`, `Pillow` et `faster-whisper` dans un environnement virtuel (le modèle `small` se télécharge depuis Hugging Face, environ 460 Mo).

Note : `render_clip.py` décode l'audio avec ffmpeg, pour contourner un conflit entre faster-whisper 1.2.1 et les versions récentes de PyAV.

---

## 7. FABRIQUER UNE VIDÉO DANS LE STYLE V2 (MÉTHODE DE LA DÉMO)

1. **Découpage** : pour chaque phrase du script voix IA, décider d'un visuel (scène 3D, carte, icône, tampon, chiffre…).
2. **Illustrations** sur Higgsfield `z_image`, **une à la fois** :
   - les scènes en 16:9 ; les cartes en 9:16 ;
   - les objets à détourer sur **fond vert uni** ;
   - décrire le personnage **toujours avec les mêmes mots** : « a friendly young Polynesian man in his twenties with short dark wavy hair, a plain blue t-shirt and navy shorts » ;
   - terminer chaque prompt par le style commun (voir `demo_v2/README.md`), puis « No text, no letters, no logos ».
3. **Détourage** : `python3 07-production/tools/keyout.py brut.png sortie.png [--shadow]`. L'option `--shadow` ne sert que pour les sujets sans bleu (comme la mascotte).
4. **Voix** : selon la décision de Naikishan. Pas de crédits ElevenLabs sans son accord.
5. **Minutage mot à mot** : faster-whisper en local (voir `align()` dans `render_clip.py`). Les horaires des mots alimentent l'animation, les sous-titres et les bruitages.
6. **Animation** : `07-production/demo_v2/scene.html`, dont la fonction `renderAt(t)` place tout à l'instant `t`. La rendre avec `node render_frames.js scene.html frames 30 <durée>`.
7. **Son** : `python3 mix_audio.py voix.mp3 mix.wav`, qui mixe la voix, la musique « île » baissée sous la voix et les bruitages de `tools/sound.py`, calés sur les mots.
8. **Montage** : la commande ffmpeg est dans `demo_v2/README.md` (H.264, son normalisé à −16 LUFS).

**Chantier technique recommandé** : `scene.html` est **écrit à la main pour la démo** (la chronologie est codée en dur). Pour produire 93 vidéos, il faut en faire un **moteur piloté par des données** : un fichier JSON par clip (scènes, images, textes, repères de mots), avec la même grammaire visuelle que les modèles A et B.

---

## 8. PROCHAINES ÉTAPES PROPOSÉES (DANS L'ORDRE)

1. Recueillir le **verdict de Naikishan sur la démo v2** et ses ajustements.
2. Faire trancher **la source des voix** et **le budget d'illustrations**. Ne rien dépenser sans son accord.
3. Transformer `scene.html` en **moteur réutilisable** (JSON par clip), puis produire le **module 00 complet** (5 clips) comme premier module, dès que les voix sont disponibles.
4. Continuer l'**écriture des modules** au format voix IA dans `06-formation/`, dans l'ordre : 02, 03, 06, puis 08 à 15. Les scripts d'origine sont dans `02-scripts-video/` ; la correspondance est dans le plan.
5. **Vérifier les points 🔎** :
   - ceux du module 05 (bois et bambou depuis la refonte 2026, régime exact des perles, fausses perles, modèles radio dispensés, compléments alimentaires, exemples CITES) ;
   - les frais OPT (module 06) ;
   - les règles des transporteurs pour les batteries, parfums et liquides (module 03) ;
   - « un échantillon gardé pour soi = achat perso », à faire confirmer par la douane.
6. Plus tard :
   - mettre l'app React à jour avec les 16 modules ;
   - créer les outils 🎁 ;
   - faire la page de vente ;
   - choisir les prix et le nom définitif.

---

## 9. CARTE DU DÉPÔT

```
00-PASSATION_Claude_Code_Desktop.md   ← ce fichier
CLAUDE.md                             ← mémoire courante du projet (règles, gamme, avancement)
01-blueprint/
  Formation_Import_Chine_Tahiti_BLUEPRINT.md   ← document maître d'origine (l'offre Starter/Pro/VIP y est marquée « remplacée »)
  PLAN_Gamme_et_Sommaire.md                    ← LE plan actuel (v2.1) : gamme, 16 modules, ligne rouge, faits vérifiés, sources
02-scripts-video/                     ← les 14 scripts d'origine au format [CAM] (matière première) + sommaire d'origine
04-plateforme/import-mastery-academy.jsx      ← app React gamifiée (encore sur les 14 modules d'origine)
05-previews/Module_04_clip_4.0_extrait_Bastien.mp3   ← la seule voix générée (20 s), réutilisée par les démos
06-formation/                         ← scripts FINAUX au format voix IA
  README.md                           ← voix, mode d'emploi, ligne rouge, avancement module par module
  Module_00_Fondations.md · Module_01_Trouver_quoi_vendre.md · Module_04_Douane.md · Module_05_Produits_interdits.md
07-production/
  README.md                           ← ancienne chaîne « diapos » (rejetée) + note vers demo_v2
  render_clip.py · render_slides.js · slides.css · scenes/   ← ancienne chaîne (l'alignement faster-whisper reste utile)
  demo_v2/                            ← LE style premium : scene.html, render_frames.js, stills.js, mix_audio.py, grain.png, README.md
  demo_v2/photos/                     ← Modele_A_editorial_cartes.png · Modele_B_scene_3D.png
  assets_hf/                          ← illustrations Higgsfield (scènes 3D, cartes, mascotte, icônes)
  tools/keyout.py · tools/sound.py    ← détourage fond vert · bruitages et musique synthétisés
  out/                                ← vidéos produites (non versionnées dans git ; la démo v2 a été envoyée dans la conversation)
```

---

## 10. LIENS

- **Page web du plan** (v2.1, privée, partageable depuis son menu « Partager ») : https://claude.ai/artifact/Rji7QZiho7Q2kLkarV73Rj
- **Sources officielles** utilisées : listées en bas de `01-blueprint/PLAN_Gamme_et_Sommaire.md` et de chaque module de `06-formation/`.
