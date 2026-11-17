# CLAUDE.md — Projet « Import Mastery — Fenua Edition »

## Le projet
Formation premium (à commercialiser) pour apprendre à **importer de Chine vers la Polynésie française (Tahiti) et vendre sur place**, de la recherche produit à la création d'entreprise, en passant par la douane PF, le marketing et l'IA.
Créateur : Naikishan, Papeete. Il gère déjà Opu Ara Store (tech, montres, accessoires) et Te Naiki Nui (bijoux), tous deux basés sur Facebook. Ses vrais exemples (posts Opu Ara, campagne Skmei Fête des Pères, grille de livraison Papeete→Papara) servent de preuves dans la formation.

**Positionnement (à garder partout) :** « la seule formation faite au fenua, pour le fenua ». Les concurrents sont des formations dropshipping génériques FR/US : on se démarque par le local (douane PF/FENIX, CCISM, Systempay, zones de livraison locales).

## La gamme (décidée le 17/11/2026, version 2 — détail dans `01-blueprint/PLAN_Gamme_et_Sommaire.md`)
- **Entrée gratuite** : posts, vidéos courtes, PDF « Les 5 erreurs qui te font perdre de l'argent en important à Tahiti », extrait du module douane. Toujours adressée à des futurs vendeurs.
- **Offre 1 — La formation « Créer ton business d'import au fenua »** : une seule formation complète, 16 modules en 4 parties (les bases, importer en règle, vendre au fenua, grandir), ~93 vidéos, ~4 h 30.
- **Offre 2 — L'accompagnement** : la formation + une dizaine d'élèves suivis (Naikishan + équipe + Claude) jusqu'à leur premier revenu, avec outils et techniques réservés.
- **Outils bonus (plus tard)** : gestionnaire de stock, compta (base : l'outil fait pour Te Naiki Nui), calculateur de douane.
- **Abandonné (ne pas reproposer)** : une formation « Savoir importer » pour le grand public. Elle apprenait aux clients des revendeurs à se passer d'eux (conflit avec les élèves vendeurs et avec les boutiques de Naikishan), et les consommateurs paient peu pour ça. Jamais de promesse du type « économise en important toi-même ».
- **Règle d'or : chaque offre doit valoir plus que son prix** (qualité, clients qui reviennent).

## Langue et ton
- Tout le contenu est en **français oral, décontracté** (« t'as », « genre », « balles »), direct, concret, sans blabla.
- L'utilisateur communique en français familier et préfère des réponses structurées, actionnables, sans remplissage.

## Structure du dossier
- `01-blueprint/` : document maître (13 modules + stratégie de vente : offre 3 niveaux, garantie, tunnel, lancement 90 jours).
- `02-scripts-video/` : sommaire + **14 scripts vidéo** (Module 00 à 13), ~75 vidéos, ~3h40. Format : `[CAM]` (ce qu'il dit), `[ÉCRAN]`, `[B-ROLL]`, `[TON]`, exercice de fin, checklist de tournage.
- `01-blueprint/PLAN_Gamme_et_Sommaire.md` : la gamme (entrée gratuite, formation, accompagnement), le sommaire en 16 modules avec ce qui est déjà écrit et ce qui reste à écrire, les faits douane vérifiés (particulier ou vendeur).
- `03-voix-ia/` : **version voix off IA** des modules 00 et 04 (format de référence).
- `05-previews/` : extraits audio générés (tests de voix).
- `06-formation/` (à créer) : les scripts finaux de la formation, au format voix IA, numérotés selon le nouveau sommaire (00 à 15).
- `04-plateforme/` : app React gamifiée (`import-mastery-academy.jsx`) : XP, 8 rangs, trophées, série, confettis, sauvegarde via `window.storage`. Design anthracite/or + turquoise lagon quand un module est validé.

## Les 14 modules d'origine (réorganisés en 16 modules dans le plan : statut remonté en 02, nouveaux modules 06 produits interdits et 08 cas réel)
00 Fondations · 01 Recherche produit · 02 Sourcing & négo · 03 Expédition & Incoterms · 04 **Douane PF (module phare)** · 05 Réception & express · 06 Pricing & marge · 07 Marketing FB/IG/TikTok · 08 IA pour le marketing · 09 Canaux de vente & site · 10 Livraison locale · 11 Service client & rachat · 12 Fiscalité & création · 13 Systématiser & scaler.

## Règles de contenu à respecter (important)
1. **Douane et fiscalité (modules 04 et 12) : exactitude avant tout.** Faits vérifiés sur sources officielles (Douane PF, DICP, CCISM) : entreprise = pas de franchise, taxée dès le 1er franc ; TVA 16 % sur la plupart des marchandises (5 % alimentaire, 0 % certains PPN ; 13 % = services), calculée en cascade sur CAF + droits + autres taxes ; TDL sur certains produits ; franchise colis réservée aux particuliers (usage perso et occasionnel, 20 000 XPF, vérifié 11/2026) ; système FENIX (FENua Import eXport, depuis 2019 ; déclaration par commissionnaire en douane, ou par soi-même avec convention) ; régime TPE / franchise de TVA jusqu'à 10 M XPF de CA ; pas d'impôt général sur le revenu en PF ; parcours CFE (CCISM) → ISPF → DICP.
   - **Particuliers (sert à expliquer l'erreur n°1 : la franchise ne s'applique pas aux vendeurs), vérifié 11/2026** : franchise jusqu'à 20 000 XPF de valeur CAF (usage perso et occasionnel) ; forfait de 20 % (colis arrivant de l'UE) ou 30 % (hors UE) entre 20 000 et 50 000 XPF ; au-delà, taxation normale + déclaration ; alcool et tabac exclus de la franchise ; « Je déclare » = téléservice pour les achats rapportés de voyage ; biosécurité (DBS) très stricte sur plantes, graines, bois, terre, produits animaux ; produits réglementés par la douane : radio (AAI ANFR), armes, médicaments, espèces protégées, contrefaçons, perles, argent liquide.
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
- [x] Plan de la gamme v2 (17/11/2026) : formation unique + accompagnement, sommaire en 16 modules — validation de l'utilisateur en attente (dont le module « Te mettre en règle » remonté en 02)
- [ ] Écrire la formation au format voix IA dans `06-formation/` : d'abord le module 05 douane (compléter la version voix IA existante) et le module 06 produits interdits (nouveau), puis les autres dans l'ordre, en vérifiant les points 🔎 du plan
- [ ] Cas réel du module 08 : un vrai achat documenté par Naikishan
- [ ] Mettre la plateforme React à jour avec les 16 modules
- [ ] Créer les outils 🎁 (calculatrice de rentabilité, grille de scoring /100, modèles de messages fournisseur, comparateur de devis, mémo douane, checklists, bibliothèque de prompts, grille de livraison, scripts SAV, dashboard KPI, roadmap 90 jours)
- [ ] Page de vente (formation + accompagnement, garantie, bonus, preuve sociale)
- [ ] Brancher les vraies vidéos et les outils sur la plateforme
- [ ] Choisir le nom définitif (pistes : « Import Mastery — Fenua Edition » pour la formation, « Fenua Import Academy » pour la page Facebook) et vérifier la disponibilité (Facebook, domaine, Instagram, TikTok)

## Outils connectés / pistes
- ElevenLabs (voix, images, vidéo) et Higgsfield (images/vidéo IA) : connecteurs MCP utilisables depuis Claude.
- CapCut : l'utilisateur prévoit de le connecter pour le montage. À vérifier quand c'est fait : pas de connecteur officiel connu ; seuls des serveurs MCP communautaires non officiels existent (VectCutAPI + capcut-mcp-server, en local, export MP4 manuel). Recommandé : générer voix et visuels avec ElevenLabs/Higgsfield, monter dans CapCut à la main.
- Chaque génération IA consomme des crédits : demander confirmation avant les générations coûteuses.

## Prochaine action conseillée
1. Faire valider le plan v2 (`01-blueprint/PLAN_Gamme_et_Sommaire.md`) et la voix IA.
2. Écrire la formation dans `06-formation/`, au format voix IA : modules 05 (douane) et 06 (produits interdits) en premier, puis les autres dans l'ordre.
