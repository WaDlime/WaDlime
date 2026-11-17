# CLAUDE.md — Projet « Import Mastery — Fenua Edition »

## Le projet
Formation premium (à commercialiser) pour apprendre à **importer de Chine vers la Polynésie française (Tahiti) et vendre sur place**, de la recherche produit à la création d'entreprise, en passant par la douane PF, le marketing et l'IA.
Créateur : Naikishan, Papeete. Il gère déjà Opu Ara Store (tech, montres, accessoires) et Te Naiki Nui (bijoux), tous deux basés sur Facebook. Ses vrais exemples (posts Opu Ara, campagne Skmei Fête des Pères, grille de livraison Papeete→Papara) servent de preuves dans la formation.

**Positionnement (à garder partout) :** « la seule formation faite au fenua, pour le fenua ». Les concurrents sont des formations dropshipping génériques FR/US : on se démarque par le local (douane PF/FENIX, CCISM, Systempay, zones de livraison locales).

## La gamme (décidée le 17/11/2026, version 2 — détail dans `01-blueprint/PLAN_Gamme_et_Sommaire.md`)
- **Entrée gratuite** : posts, vidéos courtes, PDF « Les 5 erreurs qui te font perdre de l'argent en important à Tahiti », extrait du module douane. Toujours adressée à des futurs vendeurs.
- **Offre 1 — La formation « Créer ton business d'import au fenua »** : une seule formation complète, 16 modules en 4 parties (les bases, savoir importer, vendre au fenua, grandir), ~93 vidéos, ~4 h 30. Ordre validé le 17/11/2026 : « Te mettre en règle » en module 08, au début de la partie vente (l'administratif en premier bloque les débutants).
- **Offre 2 — L'accompagnement** : la formation + une dizaine d'élèves suivis (Naikishan + équipe + Claude) jusqu'à leur premier revenu, avec outils et techniques réservés.
- **Outils bonus (plus tard)** : gestionnaire de stock, compta (base : l'outil fait pour Te Naiki Nui), calculateur de douane.
- **Abandonné (ne pas reproposer)** : une formation « Savoir importer » pour le grand public. Elle apprenait aux clients des revendeurs à se passer d'eux (conflit avec les élèves vendeurs et avec les boutiques de Naikishan), et les consommateurs paient peu pour ça. Jamais de promesse du type « économise en important toi-même ».
- **Règle d'or : chaque offre doit valoir plus que son prix** (qualité, clients qui reviennent).
- **Ligne rouge « avant les papiers »** : avant le module 08, l'élève apprend, commande une ou deux pièces pour lui et teste l'intérêt sans encaisser. Dès qu'il encaisse ou importe du stock à revendre : papiers + import pro. Jamais de stock à revendre déclaré en colis perso, même « pour tester un marché ».

## Langue et ton
- Tout le contenu est en **français oral, décontracté** (« t'as », « genre », « balles »), direct, concret, sans blabla.
- L'utilisateur communique en français familier et préfère des réponses structurées, actionnables, sans remplissage.

## Structure du dossier
- `00-PASSATION_Claude_Code_Desktop.md` : **historique complet de la conversation des 16-17/11/2026** (décisions, refus, état, comptes et crédits, méthode vidéo v2). À lire en premier sur un nouvel ordinateur.
- `01-blueprint/` : document maître (13 modules + stratégie de vente : offre 3 niveaux, garantie, tunnel, lancement 90 jours).
- `02-scripts-video/` : sommaire + **14 scripts vidéo** (Module 00 à 13), ~75 vidéos, ~3h40. Format : `[CAM]` (ce qu'il dit), `[ÉCRAN]`, `[B-ROLL]`, `[TON]`, exercice de fin, checklist de tournage.
- `01-blueprint/PLAN_Gamme_et_Sommaire.md` : la gamme (entrée gratuite, formation, accompagnement), le sommaire en 16 modules avec ce qui est déjà écrit et ce qui reste à écrire, les faits douane vérifiés (particulier ou vendeur).
- `05-previews/` : extraits audio générés (tests de voix).
- `06-formation/` : les scripts finaux de la formation au format voix IA, un fichier par module (00 à 15), + `README.md` (voix, mode d'emploi, ligne rouge, avancement). Prêts : 00, 01, 04, 05.
- `07-production/` : la fabrication des vidéos. `render_clip.py` = ancienne chaîne « diapos » (rejetée : pas assez premium). **`demo_v2/` = le nouveau style premium** (page animée `scene.html` rendue image par image, `mix_audio.py` voix + musique + bruitages, `photos/` = les 2 images modèles). `assets_hf/` = illustrations Higgsfield (+ détourages), `tools/keyout.py` (détourage fond vert), `tools/sound.py` (bruitages et musique synthétisés). Sorties dans `out/` (non versionné).
- `04-plateforme/` : app React gamifiée (`import-mastery-academy.jsx`) : XP, 8 rangs, trophées, série, confettis, sauvegarde via `window.storage`. Design anthracite/or + turquoise lagon quand un module est validé.

## Les 14 modules d'origine (réorganisés en 16 modules dans le plan : nouveaux modules 05 produits interdits et 07 cas réel, statut et fiscalité en 08)
00 Fondations · 01 Recherche produit · 02 Sourcing & négo · 03 Expédition & Incoterms · 04 **Douane PF (module phare)** · 05 Réception & express · 06 Pricing & marge · 07 Marketing FB/IG/TikTok · 08 IA pour le marketing · 09 Canaux de vente & site · 10 Livraison locale · 11 Service client & rachat · 12 Fiscalité & création · 13 Systématiser & scaler.

## Règles de contenu à respecter (important)
1. **Douane et fiscalité (modules 04 et 12) : exactitude avant tout.** Faits vérifiés sur sources officielles (Douane PF, DICP, CCISM) : entreprise = pas de franchise, taxée dès le 1er franc ; TVA 16 % sur la plupart des marchandises (5 % alimentaire, 0 % certains PPN ; 13 % = services), calculée en cascade sur CAF + droits + autres taxes ; TDL sur certains produits ; franchise colis réservée aux particuliers (usage perso et occasionnel, 20 000 XPF, vérifié 11/2026) ; système FENIX (FENua Import eXport, depuis 2019 ; déclaration par commissionnaire en douane, ou par soi-même avec convention) ; régime TPE / franchise de TVA jusqu'à 10 M XPF de CA ; pas d'impôt général sur le revenu en PF ; parcours CFE (CCISM) → ISPF → DICP.
   - **Particuliers (sert à expliquer l'erreur n°1 : la franchise ne s'applique pas aux vendeurs), vérifié 11/2026** : franchise jusqu'à 20 000 XPF de valeur CAF (usage perso et occasionnel) ; forfait de 20 % (colis arrivant de l'UE) ou 30 % (hors UE) entre 20 000 et 50 000 XPF ; au-delà, taxation normale + déclaration ; alcool et tabac exclus de la franchise ; « Je déclare » = téléservice pour les achats rapportés de voyage ; biosécurité (DBS) très stricte sur plantes, graines, bois, terre, produits animaux ; produits réglementés par la douane : radio (AAI ANFR), armes, médicaments, espèces protégées, contrefaçons, perles, argent liquide.
   - **Produits réglementés (module 05), vérifié 11/2026** : contrefaçon = délit douanier (même la simple détention) ; appareils radio = AAI de l'ANFR sauf téléphones et modèles listés ; CITES = permis, y compris maroquinerie et bracelets-montres ; perles de culture interdites à l'importation (DGAE) ; biosécurité des végétaux refondue le 16/03/2026 (arrêté n° 324 CM).
   - Les taux et seuils changent : toujours renvoyer au **simulateur des droits et taxes** (lien sur le site de la douane PF, service-public.pf/douane), à la CCISM et à la DICP.
   - Les fourchettes (ex. « +25 à +40 % de taxes ») sont des ordres de grandeur, jamais des garanties.
   - Le créateur n'est ni douanier ni conseiller fiscal : le dire dans les vidéos.
2. **Éthique** : jamais de sous-déclaration en douane, de contrefaçon, de faux avis ni de visuels IA trompeurs.
3. **Chiffres d'exemple** (ex. montre à 5 000 XPF) : placeholders à remplacer par de vrais produits du créateur.

## Direction visuelle v3 (17/11/2026 soir) — DA demandée par Naikishan, en attente de validation
- **DA « dessin animé rétro »** inspirée de ses références (Picsou, Daffy, Monopoly, affiches « Money never sleeps », couverture « Forbes ») : gros trait noir, couleurs plates, affiches à typo condensée jaune contour noir (Anton), cases de BD crème à bord noir et ombre décalée, onomatopées (« BOUM ! »), billets et pièces qui tombent. Démo : `07-production/demo_v3/` → `out/Demo_v3_cartoon_retro.mp4`, images dans `07-production/assets_v3/`.
- **Jamais les personnages des références** (Disney, Warner, Hasbro…) : uniquement le style, avec NOS personnages (le jeune Polynésien en chemise bleue, la mascotte colis à fleur de tiare). Prompt de style : « Classic 1950s golden-age American cartoon style, hand-drawn 2D cel animation, thick clean black outlines, flat bold colors… ».
- Objets verts (billets) : générer sur fond **magenta** (`keyout.py` le gère).
- **Mascotte choisie le 17/11/2026 : la frégate capitaine** (`07-production/assets_v3/mascottes/fregate3.png`) : oiseau blanc, queue noire, long bec gris fin, pattes grises, casquette de capitaine blanche à ancre dorée, chemise à fleurs turquoise (tiare), bras croisés sur des cartons. Version retouchée pour ne PAS ressembler à Donald : jamais de bec/pattes orange ni de veste marine. Le petit colis (`mascot.png`) est abandonné. Prompt : « a cheerful seabird captain (a frigatebird). White chest and white face… long thin slate-grey beak… grey webbed feet… white captain cap with a navy band and a gold anchor badge… open short-sleeve turquoise Polynesian aloha shirt with white tiare flowers ». Fond rose piégé entre les pattes : retirer les composantes de couleur du fond (scipy ndimage).
- But pédagogique rappelé : ludique, captivant, et surtout **que les élèves comprennent**.

## Démo POP (17/11/2026 soir) — style PRÉFÉRÉ par Naikishan (« plus vendeur, plus ludique »), en cours d'affinage
- `07-production/demo_pop/` (`scene.html` + `mix_pop.py`) → `out/Demo_POP_premium.mp4`. 100 % motion design en code + stickers de nos personnages (`assets_v3/hero.png`, `mascottes/fregate3.png`, icônes) : aucune nouvelle image nécessaire.
- Recette : aplats flash en dégradé radial qui changent à chaque idée (bleu, jaune, rose, lagon), gros mots en Lilita One qui claquent avec relief, idées montrées par des visuels concrets (16 cartes de modules → la 04 ; page de recherche ; « 0 résultat » ; île + repère TAHITI ; 3 cartes cochées + compteur), zooms « punch » sur les temps forts, cercles de transition à anneau blanc, flou de mouvement, confettis, reflets, sous-titres à pastille jaune, bandeau MODULE, barre de progression, bouton « C'EST PARTI ».
- Son : `mix_pop.py` (voix existante + ukulélé 112 bpm avec batterie légère + bruitages calés : frappe clavier, buzzer, dings, confettis, ka-ching), tout en local.

## Démo v4 (17/11/2026) — DA rétro en finition premium, jugée « bcp mieux » par Naikishan
- `07-production/demo_v4/` → `out/Demo_v4_premium.mp4` (60 i/s, ressorts, typo lettre à lettre en relief, transitions bandes/travelling flouté/zoom/iris doré, sous-titres à pastille dorée, bandeau MODULE 04 + barre de progression, frégate qui atterrit). **Modèle de référence pour les modules.**
- **Refusé (ne pas reproposer) : le rendu 3D doux « film d'animation / maquette isométrique »** (test `demo_iso/`, `assets_iso/`, abandonné le 17/11).
- **Higgsfield : solde à 0,1 crédit** (17/11 soir) → plus aucune génération d'image possible sans recharge.

## Direction visuelle v2 (démo du 17/11/2026, remplacée par la v3 si validée)
- L'utilisateur a refusé le style « diapos » : il veut du **premium**, **chaque phrase illustrée**, des **bruitages**, « un plaisir de regarder, donc d'apprendre ».
- **Modèle A — éditorial** (réf. « Did you know ») : fond crème à points, titre noir très gras + mot clé en italique doré (Inter Tight + Instrument Serif), cartes illustrées en éventail. Pour accroches, chapitres, fins.
- **Modèle B — scène 3D** (réf. personnages low-poly) : personnage polynésien (t-shirt bleu) dans son décor, carte crème de texte, tampons, anneaux qui pointent l'image, sous-titres mot à mot (mot actif en or). Pour raconter et expliquer.
- Fils rouges : **mascotte « colis » avec fleur de tiare**, or / corail / lagon, grain léger, musique « île » douce baissée sous la voix, whoosh entre les scènes, pops sur les apparitions.
- Ne jamais reprendre la mascotte ou le logo d'une autre marque vus dans les références.

## Format « voix off IA » (mode d'emploi complet dans `06-formation/README.md`)
- **Voix validée le 17/11/2026 : ElevenLabs « Bastien – Calm & Clear French Teacher »** (voice_id `69ujSsYIBOGW4duCBBSW`, modèle `eleven_v4`, réglages par défaut). Les balises d'intonation passent bien.
- Séparer pour chaque clip : (1) voix off pure à coller dans l'outil, (2) texte à l'écran, (3) B-roll.
- Balises d'intonation entre crochets (`[en chuchotant]`, `[ton complice]`…), à tester sur 2-3 lignes : si l'outil les lit à voix haute, les retirer et garder la ponctuation.
- `...` et virgules = respirations ; MAJUSCULES = mots accentués ; nombres et sigles écrits comme on les dit (« mille deux cents francs », pas « 1 200 XPF »).
- Mêmes voix et mêmes réglages sur tous les clips.

## État d'avancement
- [x] Blueprint complet + stratégie de vente
- [x] Plateforme React gamifiée (V1)
- [x] 14 scripts vidéo complets
- [x] Module 00 en version voix IA (`06-formation/Module_00_Fondations.md`)
- [x] Module 04 douane en version voix IA (`06-formation/Module_04_Douane.md`), faits revérifiés (11/2026), script vidéo 04 corrigé
- [x] Voix IA « Bastien » validée par l'utilisateur (17/11/2026)
- [x] Plan v2.1 validé (17/11/2026) : formation unique + accompagnement, 16 modules, « Te mettre en règle » en 08
- [x] Module 05 « Produits interdits et réglementés » écrit (`06-formation/Module_05_Produits_interdits.md`) — points 🔎 à vérifier avant publication
- [x] Module 01 « Trouver quoi vendre » écrit en voix IA (7 clips)
- [x] Chaîne de montage vidéo (`07-production/`) + vidéo démo validée techniquement + scènes des 5 clips du module 00
- [x] Démo v2 premium (23 s, début du module 04, voix déjà générée) + 2 images modèles — **en attente de validation**
- [ ] Vidéos de la partie 1 (modules 00 et 01) : choisir la source des voix (l'utilisateur ne veut plus dépenser de crédits ElevenLabs), puis illustrer chaque phrase dans le style v2
- [ ] Écrire les autres modules dans `06-formation/` au format voix IA, dans l'ordre (02, 03, 06, puis 08 à 15), en vérifiant les points 🔎 du plan
- [ ] Module 07 (cas réel) : démo filmée par Naikishan, qui envoie ses captures et ses chiffres
- [ ] Mettre la plateforme React à jour avec les 16 modules
- [ ] Créer les outils 🎁 (calculatrice de rentabilité, grille de scoring /100, modèles de messages fournisseur, comparateur de devis, mémo douane, checklists, bibliothèque de prompts, grille de livraison, scripts SAV, dashboard KPI, roadmap 90 jours)
- [ ] Page de vente (formation + accompagnement, garantie, bonus, preuve sociale)
- [ ] Brancher les vraies vidéos et les outils sur la plateforme
- [ ] Choisir le nom définitif (pistes : « Import Mastery — Fenua Edition » pour la formation, « Fenua Import Academy » pour la page Facebook) et vérifier la disponibilité (Facebook, domaine, Instagram, TikTok)

## Outils connectés / pistes
- ElevenLabs (voix, images, vidéo) et Higgsfield (images/vidéo IA) : connecteurs MCP utilisables depuis Claude.
- CapCut : l'utilisateur prévoit de le connecter pour le montage. À vérifier quand c'est fait : pas de connecteur officiel connu ; seuls des serveurs MCP communautaires non officiels existent (VectCutAPI + capcut-mcp-server, en local, export MP4 manuel). Recommandé : générer voix et visuels avec ElevenLabs/Higgsfield, monter dans CapCut à la main.
- Chaque génération IA consomme des crédits : demander confirmation avant les générations coûteuses.
- **Consigne du 17/11/2026 : ne plus dépenser de crédits ElevenLabs** sans nouvel accord de l'utilisateur.
- **Higgsfield : compte gratuit, solde épuisé (0,1 crédit le 17/11 soir).** Seul `z_image` est ouvert (0,15 crédit l'image, 2048 px, très bon rendu 3D stylisé, pas d'image de référence) ; GPT Image demande une formule payante ; générations une par une (limite de débit) ; animation vidéo IA hors budget (10 à 35 crédits / 5 s) ; musique 4,36 crédits / 30 s → musique et bruitages faits en local.
- **ElevenLabs : compte en formule gratuite** (10 000 crédits/mois ≈ 1 crédit par caractère, générations gratuites parfois saturées, **pas de licence commerciale**). Les voix finales de la formation (vendue) doivent être générées avec une formule payante (Starter minimum). Toute la formation ≈ 133 000 caractères. Générer avec `generations_count: 1` pour économiser.
- **CapCut** est installé sur l'ordinateur de l'utilisateur (pas de connecteur dans cette session) : on lui livre des MP4 finis + les SRT, il peut retoucher dans CapCut.

## Prochaine action conseillée
1. Faire valider la démo v2 (`07-production/out/Demo_v2_douane_premium.mp4`) et les 2 modèles (`07-production/demo_v2/photos/`).
2. Décider de la source des voix pour produire les modules (plus de crédits ElevenLabs sans accord) et du budget d'illustrations (~10 images par clip à 0,15 crédit).
3. Continuer l'écriture des modules (02, 03, 06, puis 08 à 15) et vérifier les points 🔎 du module 05.
