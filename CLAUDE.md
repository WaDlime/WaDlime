# CLAUDE.md — Projet « Import Mastery — Fenua Edition »

## Le projet
Formation premium (à commercialiser) pour apprendre à **importer de Chine vers la Polynésie française (Tahiti) et vendre sur place**, de la recherche produit à la création d'entreprise, en passant par la douane PF, le marketing et l'IA.
Créateur : Naikishan, Papeete. Il gère déjà Opu Ara Store (tech, montres, accessoires) et Te Naiki Nui (bijoux), tous deux basés sur Facebook. Ses vrais exemples (posts Opu Ara, campagne Skmei Fête des Pères, grille de livraison Papeete→Papara) servent de preuves dans la formation.

**Positionnement (à garder partout) :** « la seule formation faite au fenua, pour le fenua ». Les concurrents sont des formations dropshipping génériques FR/US : on se démarque par le local (douane PF/FENIX, CCISM, Systempay, zones de livraison locales).

## La gamme (vision décidée le 17/11/2026 — détail dans `01-blueprint/PLAN_Gamme_et_Formation_1.md`)
1. **Formation 1 — Savoir importer** (PRIORITÉ N°1) : pour tout le monde, pas forcément pour faire un business. Apprendre à acheter (cosmétiques, vêtements, bijoux, montres, tech…), faire venir à Tahiti, passer la douane, récupérer son colis, en règle et en autonomie. 8 modules, ~2 h.
2. **Formation 2 — Créer ton business d'import** : trouver quoi vendre, Meta Ads, visuels et affiches avec l'IA, statut, fiscalité. Reprend la majorité des 14 modules existants.
3. **Accompagnement** : une dizaine d'élèves suivis (Naikishan + équipe + Claude) jusqu'à leur premier revenu, avec outils et techniques exclusifs.
4. **Outils bonus (plus tard)** : gestionnaire de stock, compta (base : l'outil fait pour Te Naiki Nui), calculateur de douane…
- Remplace l'ancienne offre Starter / Pro / VIP du blueprint.
- **Règle d'or : chaque offre doit valoir plus que son prix** (qualité, clients qui reviennent). On finit la F1 avant d'attaquer la suite.

## Langue et ton
- Tout le contenu est en **français oral, décontracté** (« t'as », « genre », « balles »), direct, concret, sans blabla.
- L'utilisateur communique en français familier et préfère des réponses structurées, actionnables, sans remplissage.

## Structure du dossier
- `01-blueprint/` : document maître (13 modules + stratégie de vente : offre 3 niveaux, garantie, tunnel, lancement 90 jours).
- `02-scripts-video/` : sommaire + **14 scripts vidéo** (Module 00 à 13), ~75 vidéos, ~3h40. Format : `[CAM]` (ce qu'il dit), `[ÉCRAN]`, `[B-ROLL]`, `[TON]`, exercice de fin, checklist de tournage.
- `01-blueprint/PLAN_Gamme_et_Formation_1.md` : la gamme + le sommaire détaillé de la F1 (42 leçons), la répartition des 14 modules existants entre F1 et F2, les faits vérifiés pour les particuliers.
- `03-voix-ia/` : **version voix off IA** des modules 00 et 04 (format de référence).
- `05-previews/` : extraits audio générés (tests de voix).
- `06-formation-1/` (à créer) : les scripts finaux de la F1, au format voix IA.
- `04-plateforme/` : app React gamifiée (`import-mastery-academy.jsx`) : XP, 8 rangs, trophées, série, confettis, sauvegarde via `window.storage`. Design anthracite/or + turquoise lagon quand un module est validé.

## Les 14 modules (banque de contenu, répartie entre F1 et F2 — voir le plan)
00 Fondations · 01 Recherche produit · 02 Sourcing & négo · 03 Expédition & Incoterms · 04 **Douane PF (module phare)** · 05 Réception & express · 06 Pricing & marge · 07 Marketing FB/IG/TikTok · 08 IA pour le marketing · 09 Canaux de vente & site · 10 Livraison locale · 11 Service client & rachat · 12 Fiscalité & création · 13 Systématiser & scaler.

## Règles de contenu à respecter (important)
1. **Douane et fiscalité (modules 04 et 12) : exactitude avant tout.** Faits vérifiés sur sources officielles (Douane PF, DICP, CCISM) : entreprise = pas de franchise, taxée dès le 1er franc ; TVA 16 % sur la plupart des marchandises (5 % alimentaire, 0 % certains PPN ; 13 % = services), calculée en cascade sur CAF + droits + autres taxes ; TDL sur certains produits ; franchise colis réservée aux particuliers (usage perso et occasionnel, 20 000 XPF, vérifié 11/2026) ; système FENIX (FENua Import eXport, depuis 2019 ; déclaration par commissionnaire en douane, ou par soi-même avec convention) ; régime TPE / franchise de TVA jusqu'à 10 M XPF de CA ; pas d'impôt général sur le revenu en PF ; parcours CFE (CCISM) → ISPF → DICP.
   - **Particuliers (F1), vérifié 11/2026** : franchise jusqu'à 20 000 XPF de valeur CAF (usage perso et occasionnel) ; forfait de 20 % (colis arrivant de l'UE) ou 30 % (hors UE) entre 20 000 et 50 000 XPF ; au-delà, taxation normale + déclaration ; alcool et tabac exclus de la franchise ; « Je déclare » = téléservice pour les achats rapportés de voyage ; biosécurité (DBS) très stricte sur plantes, graines, bois, terre, produits animaux ; produits réglementés par la douane : radio (AAI ANFR), armes, médicaments, espèces protégées, contrefaçons, perles, argent liquide.
   - Les taux et seuils changent : toujours renvoyer au **simulateur des droits et taxes** (lien sur le site de la douane PF, service-public.pf/douane), à la CCISM et à la DICP.
   - Les fourchettes (ex. « +25 à +40 % de taxes ») sont des ordres de grandeur, jamais des garanties.
   - Le créateur n'est ni douanier ni conseiller fiscal : le dire dans les vidéos.
2. **Éthique** : jamais de sous-déclaration en douane, de contrefaçon, de faux avis ni de visuels IA trompeurs.
3. **Chiffres d'exemple** (ex. montre à 5 000 XPF) : placeholders à remplacer par de vrais produits du créateur.

## Format « voix off IA » (pour convertir les modules 01 à 13)
- Séparer pour chaque clip : (1) voix off pure à coller dans l'outil, (2) texte à l'écran, (3) B-roll.
- Balises d'intonation entre crochets (`[en chuchotant]`, `[ton complice]`…), à tester sur 2-3 lignes : si l'outil les lit à voix haute, les retirer et garder la ponctuation.
- `...` et virgules = respirations ; MAJUSCULES = mots accentués ; nombres et sigles écrits comme on les dit (« mille deux cents francs », pas « 1 200 XPF »).
- Mêmes voix et mêmes réglages sur tous les clips.

## État d'avancement
- [x] Blueprint complet + stratégie de vente
- [x] Plateforme React gamifiée (V1)
- [x] 14 scripts vidéo complets
- [x] Module 00 converti en version voix IA (à tester par l'utilisateur)
- [x] Module 04 converti en version voix IA, faits douane revérifiés sur sources officielles (11/2026), script vidéo 04 corrigé
- [x] Preview voix IA générée (début du clip 4.0, voix « Bastien » ElevenLabs) — avis de l'utilisateur en attente
- [x] Plan de la gamme + sommaire de la F1 (17/11/2026) — validation de l'utilisateur en attente
- [ ] Écrire les 8 modules de la F1 au format voix IA (module 5 douane en premier), en vérifiant les points 🔎 du plan
- [ ] Cas réel du module 8 : un vrai achat documenté par Naikishan
- [ ] Mettre la plateforme React à jour pour la gamme (F1 d'abord)
- [ ] F2 : convertir les modules business en version voix IA (après la F1)
- [ ] Créer les outils 🎁 (calculatrice de rentabilité, grille de scoring /100, modèles de messages fournisseur, comparateur de devis, mémo douane, checklists, bibliothèque de prompts, grille de livraison, scripts SAV, dashboard KPI, roadmap 90 jours)
- [ ] Page de vente (offre 3 niveaux, garantie, bonus, preuve sociale)
- [ ] Brancher les vraies vidéos et les outils sur la plateforme
- [ ] Choisir le nom définitif (pistes : « Import Mastery — Fenua Edition » pour la formation, « Fenua Import Academy » pour la page Facebook) et vérifier la disponibilité (Facebook, domaine, Instagram, TikTok)

## Outils connectés / pistes
- ElevenLabs (voix, images, vidéo) et Higgsfield (images/vidéo IA) : connecteurs MCP utilisables depuis Claude.
- CapCut : l'utilisateur prévoit de le connecter pour le montage. À vérifier quand c'est fait : pas de connecteur officiel connu ; seuls des serveurs MCP communautaires non officiels existent (VectCutAPI + capcut-mcp-server, en local, export MP4 manuel). Recommandé : générer voix et visuels avec ElevenLabs/Higgsfield, monter dans CapCut à la main.
- Chaque génération IA consomme des crédits : demander confirmation avant les générations coûteuses.

## Prochaine action conseillée
1. Faire valider le sommaire de la F1 (`01-blueprint/PLAN_Gamme_et_Formation_1.md`) et la voix IA.
2. Écrire la F1 dans `06-formation-1/`, au format voix IA : le module 5 (douane, partie particulier d'abord) en premier, puis les modules 1 à 8.
