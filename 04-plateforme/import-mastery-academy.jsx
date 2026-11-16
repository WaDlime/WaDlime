import React, { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   IMPORT MASTERY — FENUA EDITION
   Parcours premium gamifié (Chine → Tahiti)
   Signature : colonne lumineuse qui se remplit + or → turquoise lagon
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');

:root{
  --void:#0B0B0D; --anthra:#141418; --card:#1A1A1F; --card2:#202027;
  --line:#2A2A31; --line2:#34343d;
  --gold:#E0AE3F; --gold-bright:#F6CC63; --gold-deep:#7d5e1c;
  --lagoon:#34D8B4; --lagoon-deep:#117a64;
  --text:#F2F0E9; --muted:#8C8C97; --muted2:#5d5d68;
  --r:18px;
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
.ima-root{
  font-family:'Inter',system-ui,sans-serif;
  background:var(--void); color:var(--text);
  min-height:100vh; width:100%;
  position:relative; overflow-x:hidden;
}
.ima-root::before{
  content:""; position:fixed; inset:0; pointer-events:none; z-index:0;
  background:
    radial-gradient(900px 500px at 50% -8%, rgba(224,174,63,.10), transparent 60%),
    radial-gradient(700px 600px at 110% 20%, rgba(52,216,180,.05), transparent 60%);
}
.ima-wrap{position:relative; z-index:1; max-width:640px; margin:0 auto; padding:0 18px 120px}

/* ---------- HUD ---------- */
.hud{position:sticky; top:0; z-index:40; backdrop-filter:blur(16px);
  background:linear-gradient(180deg, rgba(11,11,13,.92), rgba(11,11,13,.7));
  border-bottom:1px solid var(--line); margin:0 -18px; padding:12px 18px 12px}
.hud-row{display:flex; align-items:center; gap:12px; max-width:640px; margin:0 auto}
.brand{display:flex; align-items:center; gap:9px; margin-right:auto; min-width:0}
.brand-mark{width:30px;height:30px;border-radius:9px;flex:0 0 auto;
  background:linear-gradient(145deg,var(--gold-bright),var(--gold-deep));
  display:grid;place-items:center;font-family:'Archivo';font-weight:900;color:#1a1407;font-size:15px;
  box-shadow:0 0 18px rgba(224,174,63,.4)}
.brand-txt{display:flex;flex-direction:column;line-height:1;min-width:0}
.brand-txt b{font-family:'Archivo';font-weight:800;font-size:13px;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.brand-txt span{font-family:'JetBrains Mono';font-size:9px;color:var(--gold);letter-spacing:.22em;margin-top:3px}
.hud-chip{display:flex;align-items:center;gap:6px;font-family:'JetBrains Mono';font-weight:700;font-size:12px;
  background:var(--card);border:1px solid var(--line);padding:7px 10px;border-radius:11px;cursor:pointer;color:var(--text)}
.hud-chip.flame{color:var(--gold)}
.hud-chip.mut{color:var(--muted2)}
.lvl-chip{color:var(--gold);border-color:rgba(224,174,63,.35);background:rgba(224,174,63,.08)}

/* ---------- HERO ---------- */
.hero{margin-top:22px; background:linear-gradient(165deg,var(--card),var(--anthra));
  border:1px solid var(--line); border-radius:24px; padding:22px; position:relative; overflow:hidden}
.hero::after{content:"";position:absolute;top:-40%;right:-20%;width:240px;height:240px;border-radius:50%;
  background:radial-gradient(circle,rgba(224,174,63,.14),transparent 65%)}
.eyebrow{font-family:'JetBrains Mono';font-size:10px;letter-spacing:.28em;color:var(--gold);text-transform:uppercase}
.hero h1{font-family:'Archivo';font-weight:900;font-size:30px;line-height:1.02;margin:10px 0 4px;letter-spacing:-.02em}
.hero h1 em{font-style:normal;color:var(--gold)}
.hero-sub{color:var(--muted);font-size:13.5px;max-width:330px}
.hero-mid{display:flex;align-items:center;gap:20px;margin-top:20px}
.ring-wrap{position:relative;width:104px;height:104px;flex:0 0 auto}
.ring-num{position:absolute;inset:0;display:grid;place-items:center;text-align:center}
.ring-num b{font-family:'Archivo';font-weight:900;font-size:25px;line-height:1}
.ring-num span{font-family:'JetBrains Mono';font-size:9px;color:var(--muted);letter-spacing:.1em;display:block;margin-top:2px}
.rank-block{flex:1;min-width:0}
.rank-label{font-family:'JetBrains Mono';font-size:10px;color:var(--muted);letter-spacing:.2em;text-transform:uppercase}
.rank-name{font-family:'Archivo';font-weight:800;font-size:21px;margin:3px 0 8px}
.xpbar{height:9px;border-radius:6px;background:var(--card2);overflow:hidden;border:1px solid var(--line)}
.xpbar i{display:block;height:100%;border-radius:6px;background:linear-gradient(90deg,var(--gold-deep),var(--gold-bright));
  box-shadow:0 0 14px rgba(224,174,63,.5);transition:width .8s cubic-bezier(.22,1,.36,1)}
.xp-meta{display:flex;justify-content:space-between;margin-top:7px;font-family:'JetBrains Mono';font-size:10.5px;color:var(--muted)}
.cta{margin-top:18px;width:100%;border:none;cursor:pointer;border-radius:14px;padding:15px;
  font-family:'Archivo';font-weight:800;font-size:14.5px;letter-spacing:.02em;color:#17120a;
  background:linear-gradient(135deg,var(--gold-bright),var(--gold));
  box-shadow:0 10px 30px -8px rgba(224,174,63,.55);display:flex;align-items:center;justify-content:center;gap:9px;
  transition:transform .15s, box-shadow .2s}
.cta:active{transform:scale(.98)}
.cta.done{background:linear-gradient(135deg,var(--lagoon),var(--lagoon-deep));color:#06231d;box-shadow:0 10px 30px -8px rgba(52,216,180,.5)}

/* ---------- stat strip ---------- */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}
.stat{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:13px 12px;text-align:center}
.stat b{font-family:'Archivo';font-weight:900;font-size:20px;display:block}
.stat span{font-family:'JetBrains Mono';font-size:9px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase}

/* ---------- section head ---------- */
.shead{display:flex;align-items:baseline;gap:10px;margin:34px 2px 14px}
.shead h2{font-family:'Archivo';font-weight:900;font-size:17px;letter-spacing:.02em}
.shead .ln{flex:1;height:1px;background:var(--line)}
.shead small{font-family:'JetBrains Mono';font-size:10px;color:var(--muted);letter-spacing:.12em}

/* ---------- SPINE + nodes ---------- */
.spine{position:relative;padding-left:46px}
.spine-track{position:absolute;left:18px;top:14px;bottom:14px;width:3px;border-radius:3px;background:var(--line)}
.spine-fill{position:absolute;left:0;top:0;width:100%;border-radius:3px;
  background:linear-gradient(180deg,var(--gold-bright),var(--gold-deep));
  box-shadow:0 0 16px rgba(224,174,63,.55);transition:height 1s cubic-bezier(.22,1,.36,1)}

.node{position:relative;margin-bottom:14px}
.dot{position:absolute;left:-46px;top:18px;width:37px;height:37px;border-radius:50%;
  display:grid;place-items:center;font-family:'JetBrains Mono';font-weight:700;font-size:12px;
  background:var(--card2);border:2px solid var(--line2);color:var(--muted);z-index:2;transition:.3s}
.node.cur .dot{border-color:var(--gold);color:var(--gold);box-shadow:0 0 0 5px rgba(224,174,63,.12),0 0 18px rgba(224,174,63,.4)}
.node.done .dot{border-color:var(--lagoon);background:rgba(52,216,180,.12);color:var(--lagoon);
  box-shadow:0 0 0 5px rgba(52,216,180,.1),0 0 16px rgba(52,216,180,.4)}

.mcard{width:100%;text-align:left;cursor:pointer;background:linear-gradient(160deg,var(--card),var(--anthra));
  border:1px solid var(--line);border-radius:var(--r);padding:16px 16px 14px;color:var(--text);
  transition:transform .15s, border-color .2s, box-shadow .2s; display:block}
.mcard:active{transform:scale(.985)}
.node.cur .mcard{border-color:rgba(224,174,63,.4);box-shadow:0 0 0 1px rgba(224,174,63,.15)}
.node.done .mcard{border-color:rgba(52,216,180,.22)}
.mcard-top{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.mcard-top h3{font-family:'Archivo';font-weight:800;font-size:15.5px;letter-spacing:-.01em;margin-right:auto}
.chip{font-family:'JetBrains Mono';font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  padding:4px 8px;border-radius:7px;white-space:nowrap}
.chip.todo{color:var(--muted);background:var(--card2);border:1px solid var(--line)}
.chip.cur{color:var(--gold);background:rgba(224,174,63,.1);border:1px solid rgba(224,174,63,.3)}
.chip.done{color:var(--lagoon);background:rgba(52,216,180,.1);border:1px solid rgba(52,216,180,.3)}
.mcard p{color:var(--muted);font-size:12.8px;line-height:1.45;margin:0 0 12px}
.mini{display:flex;align-items:center;gap:9px}
.mini-bar{flex:1;height:6px;border-radius:5px;background:var(--card2);overflow:hidden;border:1px solid var(--line)}
.mini-bar i{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,var(--gold-deep),var(--gold-bright));transition:width .6s ease}
.node.done .mini-bar i{background:linear-gradient(90deg,var(--lagoon-deep),var(--lagoon))}
.mini small{font-family:'JetBrains Mono';font-size:10px;color:var(--muted);min-width:34px;text-align:right}
.badge-pin{font-size:13px}

/* ---------- SHEET (module détail) ---------- */
.scrim{position:fixed;inset:0;z-index:60;background:rgba(5,5,7,.66);backdrop-filter:blur(4px);
  animation:fade .25s ease}
.sheet{position:fixed;left:0;right:0;bottom:0;z-index:61;max-width:640px;margin:0 auto;
  max-height:92vh;background:var(--anthra);border:1px solid var(--line);
  border-radius:26px 26px 0 0;overflow-y:auto;animation:slideUp .35s cubic-bezier(.22,1,.36,1)}
.sheet-grab{width:42px;height:4px;border-radius:3px;background:var(--line2);margin:11px auto 0}
.sheet-hd{padding:14px 22px 18px;position:sticky;top:0;background:linear-gradient(180deg,var(--anthra),rgba(20,20,24,.6));z-index:2}
.sheet-hd .eyebrow{margin-bottom:6px}
.sheet-hd h2{font-family:'Archivo';font-weight:900;font-size:23px;letter-spacing:-.02em;line-height:1.05}
.sheet-goal{display:flex;gap:10px;align-items:flex-start;margin-top:12px;
  background:var(--card);border:1px solid var(--line);border-radius:13px;padding:11px 13px}
.sheet-goal span{font-size:16px}
.sheet-goal p{font-size:12.5px;color:var(--muted);line-height:1.4;margin:0}
.sheet-body{padding:4px 16px 30px}

.item{display:flex;gap:13px;align-items:flex-start;width:100%;text-align:left;cursor:pointer;
  background:var(--card);border:1px solid var(--line);border-radius:15px;padding:14px;margin-bottom:10px;
  color:var(--text);transition:border-color .2s, background .2s, transform .1s}
.item:active{transform:scale(.99)}
.item.on{border-color:rgba(52,216,180,.35);background:linear-gradient(160deg,rgba(52,216,180,.07),var(--card))}
.item.tool{border-color:rgba(224,174,63,.3);background:linear-gradient(160deg,rgba(224,174,63,.07),var(--card))}
.item.tool.on{border-color:rgba(52,216,180,.35)}
.cbox{flex:0 0 auto;width:26px;height:26px;border-radius:9px;border:2px solid var(--line2);
  display:grid;place-items:center;margin-top:1px;transition:.25s;position:relative}
.item.on .cbox{border-color:var(--lagoon);background:var(--lagoon)}
.cbox svg{width:15px;height:15px;stroke:#06231d;stroke-width:3.2;fill:none;
  stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:22;stroke-dashoffset:22;transition:stroke-dashoffset .3s .05s}
.item.on .cbox svg{stroke-dashoffset:0}
.item-txt{min-width:0;flex:1}
.item-txt h4{font-family:'Inter';font-weight:600;font-size:14px;margin:0 0 4px;display:flex;align-items:center;gap:7px}
.item.on .item-txt h4{color:var(--lagoon)}
.item-txt p{font-size:12.3px;color:var(--muted);line-height:1.46;margin:0}
.item .xp{font-family:'JetBrains Mono';font-size:10px;font-weight:700;color:var(--gold);
  border:1px solid rgba(224,174,63,.3);border-radius:7px;padding:3px 6px;flex:0 0 auto;align-self:flex-start;margin-top:1px}
.item.on .xp{color:var(--lagoon);border-color:rgba(52,216,180,.3)}
.tool-tag{font-family:'JetBrains Mono';font-size:9px;letter-spacing:.12em;color:var(--gold);text-transform:uppercase}

/* ---------- badges ---------- */
.bgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}
.badge{aspect-ratio:1;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;
  background:var(--card);border:1px solid var(--line);padding:10px;text-align:center;transition:.3s}
.badge.locked{opacity:.4;filter:grayscale(1)}
.badge.got{border-color:rgba(224,174,63,.4);background:linear-gradient(160deg,rgba(224,174,63,.1),var(--card));
  box-shadow:0 0 22px -6px rgba(224,174,63,.4)}
.badge .e{font-size:27px;line-height:1}
.badge small{font-family:'JetBrains Mono';font-size:9px;letter-spacing:.04em;color:var(--muted);line-height:1.2}
.badge.got small{color:var(--gold)}

/* ---------- celebration ---------- */
.cele-scrim{position:fixed;inset:0;z-index:80;display:grid;place-items:center;
  background:rgba(5,5,7,.7);backdrop-filter:blur(6px);animation:fade .3s; padding:24px}
.cele{max-width:340px;width:100%;background:linear-gradient(165deg,var(--card),var(--anthra));
  border:1px solid rgba(224,174,63,.3);border-radius:26px;padding:30px 24px;text-align:center;
  box-shadow:0 30px 80px -20px rgba(224,174,63,.4);animation:pop .5s cubic-bezier(.34,1.56,.64,1)}
.cele.lagoon{border-color:rgba(52,216,180,.35);box-shadow:0 30px 80px -20px rgba(52,216,180,.4)}
.cele .big{font-size:62px;line-height:1;margin-bottom:10px;animation:bounce .6s .1s both}
.cele .eyebrow{margin-bottom:8px}
.cele h3{font-family:'Archivo';font-weight:900;font-size:25px;letter-spacing:-.02em;margin:0 0 8px;line-height:1.05}
.cele p{color:var(--muted);font-size:13px;line-height:1.45;margin:0 0 8px}
.cele .gain{display:inline-block;font-family:'JetBrains Mono';font-weight:700;font-size:13px;color:var(--gold);
  background:rgba(224,174,63,.1);border:1px solid rgba(224,174,63,.3);border-radius:10px;padding:6px 12px;margin:6px 0 18px}
.cele.lagoon .gain{color:var(--lagoon);background:rgba(52,216,180,.1);border-color:rgba(52,216,180,.3)}
.cele button{width:100%;border:none;cursor:pointer;border-radius:13px;padding:14px;
  font-family:'Archivo';font-weight:800;font-size:14px;color:#17120a;
  background:linear-gradient(135deg,var(--gold-bright),var(--gold))}
.cele.lagoon button{background:linear-gradient(135deg,var(--lagoon),var(--lagoon-deep));color:#06231d}

#confetti{position:fixed;inset:0;z-index:79;pointer-events:none}

.foot{text-align:center;margin-top:40px;color:var(--muted2);font-size:11px;line-height:1.6}
.foot b{color:var(--muted);font-family:'JetBrains Mono';letter-spacing:.05em}

@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes pop{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes bounce{0%{transform:scale(.4)}60%{transform:scale(1.15)}100%{transform:scale(1)}}
@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}}
`;

/* ---------------- DATA ---------------- */
const L = 50, T = 100; // xp lesson / tool
const MODULES = [
  { id:"m0", n:"00", title:"Fondations & Mindset", goal:"Comprendre tout le business avant de dépenser 1 franc.",
    items:[
      {id:"a",t:"La chaîne de valeur complète",d:"Idée → validation → sourcing → négo → expédition → douane → marketing → vente → livraison → rachat. Le profit se gagne (ou se perd) à chaque maillon."},
      {id:"b",t:"Les 3 modèles au fenua",d:"Stock & revente, précommande, ou hybride. On démarre en hybride : tester en précommande, puis stocker ce qui marche."},
      {id:"c",t:"Unit economics : la formule du profit",d:"Profit = Prix − (produit + transport + douane + pub + livraison + paiement + casse). Vise un coût rendu ≤ 25-30 % du prix de vente."},
      {id:"x",type:"tool",t:"Calculatrice de rentabilité",d:"Ton outil signature : entre tes chiffres, vois ton profit réel par produit."},
    ], badge:{e:"🚀",name:"Premier Pas"} },
  { id:"m1", n:"01", title:"Recherche & validation produit", goal:"Trouver un produit qui se vend ICI — et valider la demande AVANT d'acheter.",
    items:[
      {id:"a",t:"Trouver des idées produit",d:"Espionne les vendeurs locaux actifs (posts les plus commentés = demande prouvée) + TikTok Creative Center, AliExpress best-sellers, Google Trends."},
      {id:"b",t:"Les 7 critères d'un bon produit",d:"Léger, marge ×3 mini, effet wow, solide, non réglementé, lié au climat/lifestyle local (plage, sport, streetwear, tech)."},
      {id:"c",t:"Valider la demande (testing)",d:"Post test → pub 1-2 000 XPF → précommande RÉELLE. Le seul vrai signal : est-ce que des gens PAIENT avant que t'aies le stock ?"},
      {id:"d",t:"Détecter une arnaque produit",d:"Méfie-toi des produits miracle, des buzz morts depuis 6 mois, et demande-toi pourquoi personne ne le vend déjà ici."},
      {id:"x",type:"tool",t:"Grille de scoring produit",d:"Note /100. Tu ne commandes que si le score dépasse 70."},
    ], badge:{e:"🔍",name:"Chasseur"} },
  { id:"m2", n:"02", title:"Sourcing & négociation", goal:"Acheter au vrai prix usine, sans te faire arnaquer.",
    items:[
      {id:"a",t:"Alibaba vs 1688 vs Taobao",d:"Alibaba = B2B sécurisé. 1688 = le Alibaba chinois, -30 à -50 % (via agent). Taobao = détail chinois. Le pro achète sur 1688."},
      {id:"b",t:"L'agent de sourcing",d:"Le maillon que personne n'enseigne : il trouve, vérifie, négocie, regroupe et expédie pour toi. Indispensable pour le 1688."},
      {id:"c",t:"Reconnaître un bon fournisseur",d:"Usine > intermédiaire, ancienneté, Verified Supplier, réactivité. Jamais de virement à un inconnu."},
      {id:"d",t:"Négocier prix ET MOQ (scripts)",d:"Le MOQ est presque toujours négociable. Levier n°1 : promettre du récurrent. Scripts prêts inclus."},
      {id:"e",t:"L'échantillon obligatoire",d:"Toujours commander 1-3 échantillons payants AVANT toute grosse commande. C'est ton assurance-vie."},
      {id:"x",type:"tool",t:"Modèles de messages + checklist 12 points",d:"Premier contact, négo, commande — prêts à copier en anglais."},
    ], badge:{e:"🤝",name:"Négociateur"} },
  { id:"m3", n:"03", title:"Expédition & Incoterms", goal:"Faire venir la marchandise au meilleur coût, sans surprise.",
    items:[
      {id:"a",t:"Direct fournisseur vs transitaire",d:"Direct = simple, petits volumes, cher au poids. Transitaire = la voie pro pour le volume."},
      {id:"b",t:"Air vs Mer",d:"Aérien : rapide & cher (produits légers/tests). Maritime : lent (4-8 sem.) mais imbattable au volume (réassort)."},
      {id:"c",t:"Les Incoterms — demande du FOB",d:"FOB = le fournisseur livre au port chinois, ton transitaire prend le relais. Le standard à exiger."},
      {id:"d",t:"Choisir un transitaire fiable",d:"Pars de la liste officielle CCISM. 3 devis mini. Méfie-toi du devis trop beau (frais cachés à l'arrivée)."},
      {id:"e",t:"Calculer le coût rendu RÉEL",d:"FOB + fret + assurance + douane + TVA + TDL + frais transitaire + change. Tu ne connais ta marge qu'APRÈS ce calcul."},
      {id:"x",type:"tool",t:"Comparateur de devis transitaire",d:"+ mini-glossaire Incoterms illustré."},
    ], badge:null },
  { id:"m4", n:"04", title:"Douane Polynésie", goal:"Le module qui vaut le prix de la formation : ne jamais être surpris ni saisi.",
    items:[
      {id:"a",t:"Entreprise ≠ particulier",d:"En entreprise : AUCUNE franchise, taxé dès le 1er franc, déclaration obligatoire. 90 % des débutants l'ignorent."},
      {id:"b",t:"La valeur en douane (base CIF)",d:"On te taxe sur le prix payé + transport + assurance. Plus ton fret est cher, plus la base taxable monte."},
      {id:"c",t:"Les taxes : DD + TVA 16 % + TDL",d:"Droits de douane (selon code SH) + TVA 16 % + Taxe de Développement Local. Prévois souvent +25 à +40 % sur la valeur."},
      {id:"d",t:"Le dédouanement FENIX",d:"Tout passe par le système Fenua Import Export. Au début : laisse ton commissionnaire en douane déclarer pour toi."},
      {id:"e",t:"Classer son produit (code SH)",d:"Le code de nomenclature détermine tes taxes. Estime-les AVANT d'acheter avec le simulateur officiel de la douane PF."},
      {id:"f",t:"Saisies & amendes — jamais sous-déclarer",d:"Sous-déclaration, contrefaçon, produit prohibé = saisie + amende. On enseigne la conformité, pas la fraude."},
      {id:"x",type:"tool",t:"Mémo douane PF + contacts officiels",d:"Douane, CCISM, DICP + tuto du simulateur de taxation."},
    ], badge:{e:"🛃",name:"Maître Douane"} },
  { id:"m5", n:"05", title:"Réception & express", goal:"Récupérer ta marchandise sans stress et au bon endroit.",
    items:[
      {id:"a",t:"DHL / FedEx : les taxes à l'arrivée",d:"L'express livre vite mais te facture les droits & taxes PF (+ frais de dossier). C'est là que les taxes surprises tombent."},
      {id:"b",t:"Le réflexe réception",d:"Garde du budget pour les taxes, vérifie le colis (casse/conformité), photographie tout en cas de litige."},
      {id:"x",type:"tool",t:"Checklist réception",d:"Vérif colis, contrôle des taxes facturées, gestion litige."},
    ], badge:null },
  { id:"m6", n:"06", title:"Pricing & marge", goal:"L'erreur la plus chère des débutants : importer, vendre… et gagner zéro.",
    items:[
      {id:"a",t:"Le vrai coût de revient",d:"Coût rendu unitaire = tout compris (produit, fret, taxes, change, casse). Le point de départ de tout."},
      {id:"b",t:"Les méthodes de prix",d:"Coût × coef (×3 à ×5), prix psychologique, prix de la valeur perçue (la marque), vs concurrence locale."},
      {id:"c",t:"Intégrer TOUS les coûts variables",d:"Pub par vente (CPA), frais paiement Systempay, livraison locale, retours/SAV. Ceux qu'on oublie te tuent la marge."},
      {id:"d",t:"La marge cible : 30-40 % net",d:"Après TOUT. Si t'es à 10 %, le moindre imprévu te met à perte."},
      {id:"x",type:"tool",t:"Calculatrice avancée (CPA + livraison + paiement)",d:"Ton outil de pilotage de marge."},
    ], badge:{e:"💰",name:"Roi de la Marge"} },
  { id:"m7", n:"07", title:"Marketing FB · IG · TikTok", goal:"Créer la demande et vendre — pas juste « poster ».",
    items:[
      {id:"a",t:"Offre > Produit",d:"On n'achète pas un produit, on achète une offre irrésistible : produit + bonus + garantie + facilité + raison d'agir maintenant."},
      {id:"b",t:"L'organique au fenua",d:"Facebook reste roi pour le e-commerce local. TikTok = la machine à reach gratuit. Hook 3s → désir → CTA clair."},
      {id:"c",t:"Le funnel DM closing",d:"Ici, beaucoup de ventes se closent en messagerie. Réponse auto (zones/surcharges) + script de closing en DM."},
      {id:"d",t:"La pub Meta (Ads)",d:"Structure de campagne, test de 3-5 créas, on garde le gagnant, on scale. Décider avec les chiffres (CPM, CTR, coût/DM, ROAS)."},
      {id:"x",type:"tool",t:"Modèles posts + script closing + template campagne",d:"Étude de cas réelle : la campagne SKMEI Fête des Pères."},
    ], badge:{e:"📱",name:"Machine Marketing"} },
  { id:"m8", n:"08", title:"L'IA pour le marketing", goal:"Ton avantage de premier arrivé : produire 10× plus de contenu pro.",
    items:[
      {id:"a",t:"Copywriting & stratégie",d:"Assistants IA pour angles, posts, pubs, scripts, fiches produit. La compétence clé = le prompting (contexte + ton local)."},
      {id:"b",t:"Les visuels IA",d:"Mises en scène produit lifestyle, détourage, variations de créas sans shooting coûteux. Jamais de visuel mensonger."},
      {id:"c",t:"La vidéo IA",d:"Sous-titres auto, montage rapide, voix off, avatars pour Reels/TikTok. Script → visuels → montage → publication."},
      {id:"d",t:"L'automatisation",d:"Réponses auto Messenger/Insta (FAQ, commande, zones) + suivi léger des commandes."},
      {id:"x",type:"tool",t:"Bibliothèque de prompts + workflow « 1 produit → 10 contenus »",d:"Prêts à l'emploi, à très forte valeur perçue."},
    ], badge:{e:"🤖",name:"Pilote IA"} },
  { id:"m9", n:"09", title:"Canaux de vente & site", goal:"Encaisser proprement, du DM au site pro.",
    items:[
      {id:"a",t:"Vendre en messagerie",d:"Systématise le closing DM + l'encaissement (virement, espèces livraison, lien de paiement)."},
      {id:"b",t:"Shopify + Systempay",d:"Stripe n'existe pas ici. Pour la CB en ligne : Systempay via Banque de Tahiti / Socredo (contrat VAD)."},
      {id:"x",type:"tool",t:"Guide Shopify + Systempay pas-à-pas",d:"Étapes, banque, contrat vente à distance."},
    ], badge:null },
  { id:"m10", n:"10", title:"Livraison locale", goal:"Livrer fiable et rentable — Papeete → Papara & au-delà.",
    items:[
      {id:"a",t:"Soi-même vs prestataire",d:"Soi-même au début (contrôle + relation client = rachat). Prestataire quand le volume monte (à intégrer au prix)."},
      {id:"b",t:"Grille de zones & surcharges",d:"Construis ta grille tarifaire claire (zone standard + surcharges) et communique-la en réponse auto."},
      {id:"x",type:"tool",t:"Modèle de grille de livraison",d:"Zones + surcharges + message type prêt à coller."},
    ], badge:null },
  { id:"m11", n:"11", title:"Service client & rachat", goal:"Transformer 1 client en 5 commandes. Le profit est dans le rachat.",
    items:[
      {id:"a",t:"Réponse rapide = ta meilleure pub",d:"Sur un marché petit, le bouche-à-oreille est roi. Être joignable = ton actif n°1."},
      {id:"b",t:"Suivi post-achat & avis",d:"Remerciement, demande d'avis, photo client → preuve sociale gratuite."},
      {id:"c",t:"Relance & fidélité",d:"Nouvelles arrivées, offres VIP, petits cadeaux. Acquérir coûte cher, faire racheter est quasi gratuit."},
      {id:"d",t:"Gérer un client mécontent",d:"Reste pro, propose une solution. Un problème bien géré crée un client fidèle."},
      {id:"x",type:"tool",t:"Scripts SAV + séquence de relance",d:"Gestion de litige + demande d'avis."},
    ], badge:null },
  { id:"m12", n:"12", title:"Fiscalité & création", goal:"Être en règle dès le départ, sans payer trop d'impôts.",
    items:[
      {id:"a",t:"La patente (entreprise individuelle)",d:"La forme la plus simple, sans capital minimum, formalités rapides. C'est par là qu'on commence."},
      {id:"b",t:"Le parcours CFE → ISPF → DICP",d:"CFE de la CCISM (guichet unique) → numéro Tahiti (ISPF) → suivi fiscal (DICP)."},
      {id:"c",t:"Régime TPE / franchise de TVA",d:"Possible si CA ≤ 10 M XPF/an. En franchise tu ne factures pas la TVA — souvent plus simple pour démarrer."},
      {id:"d",t:"La logique TVA de l'importateur",d:"Au réel tu récupères la TVA d'import mais tu la factures. En franchise, ni l'un ni l'autre. À arbitrer selon ton volume."},
      {id:"x",type:"tool",t:"Parcours de création pas-à-pas + contacts",d:"Pièces à fournir + tableau patente vs société."},
    ], badge:{e:"📋",name:"100 % Réglo"} },
  { id:"m13", n:"13", title:"Systématiser & scaler", goal:"Passer du side-hustle à la vraie entreprise.",
    items:[
      {id:"a",t:"Réassort intelligent",d:"Ne re-commande que les gagnants, anticipe les délais (maritime 6-8 sem.), évite la rupture sur un produit qui cartonne."},
      {id:"b",t:"Gestion de trésorerie",d:"Le cash est immobilisé en stock/transit. Pilote pour ne jamais te retrouver à sec."},
      {id:"c",t:"Déléguer",d:"Livraison, SAV, contenu (IA + assistant). Ton temps vaut plus que ces tâches."},
      {id:"d",t:"KPIs / tableau de bord",d:"CA, marge nette, CPA, taux de rachat, stock dormant. Décide avec les chiffres."},
      {id:"e",t:"De multi-produits à marque",d:"Construis une vraie identité (façon Opu Ara) pour sortir de la guerre des prix."},
      {id:"x",type:"tool",t:"Tableau de bord KPI + roadmap 90 jours",d:"Ton plan d'action post-formation."},
    ], badge:{e:"🏝️",name:"Boss du Fenua"} },
];

const RANKS = [
  { name:"Bleu", pct:0 }, { name:"Apprenti", pct:.12 }, { name:"Sourceur", pct:.25 },
  { name:"Négociateur", pct:.38 }, { name:"Importateur", pct:.52 }, { name:"Closer", pct:.66 },
  { name:"Patron", pct:.82 }, { name:"Boss du Fenua", pct:1 },
];

const ALL_BADGES = MODULES.filter(m=>m.badge).map(m=>({ mid:m.id, ...m.badge }));
const itemXp = (it)=> it.type==="tool" ? T : L;
const MAX_XP = MODULES.reduce((s,m)=> s + m.items.reduce((a,it)=>a+itemXp(it),0), 0);
const STORE_KEY = "opuara_academy_v2";
const todayStr = ()=> new Date().toISOString().slice(0,10);

/* ---------------- SOUND ---------------- */
let actx;
function tone(freqs, t0, dur, type="sine", vol=.05){
  try{
    if(!actx) actx = new (window.AudioContext||window.webkitAudioContext)();
    freqs.forEach((f,i)=>{
      const o=actx.createOscillator(), g=actx.createGain();
      o.type=type; o.frequency.value=f; o.connect(g); g.connect(actx.destination);
      const s=actx.currentTime+t0+i*0.06;
      g.gain.setValueAtTime(0,s);
      g.gain.linearRampToValueAtTime(vol,s+0.01);
      g.gain.exponentialRampToValueAtTime(0.0001,s+dur);
      o.start(s); o.stop(s+dur+0.02);
    });
  }catch(e){}
}
const sfx = {
  tick: (on)=> on && tone([880],0,0.12,"triangle",.035),
  done: (on)=> on && tone([523.25,659.25,783.99],0,0.5,"sine",.05),
  big:  (on)=> on && tone([523.25,659.25,783.99,1046.5,1318.5],0,0.7,"sine",.055),
};

/* ---------------- CONFETTI ---------------- */
function burst(canvas, palette){
  if(!canvas) return;
  if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx=canvas.getContext("2d");
  const dpr=Math.min(window.devicePixelRatio||1,2);
  canvas.width=innerWidth*dpr; canvas.height=innerHeight*dpr; ctx.scale(dpr,dpr);
  const N=110, parts=[];
  for(let i=0;i<N;i++){
    parts.push({
      x:innerWidth/2, y:innerHeight*0.42,
      vx:(Math.random()-.5)*9, vy:Math.random()*-13-4,
      g:.32+Math.random()*.12, s:5+Math.random()*6,
      rot:Math.random()*6.28, vr:(Math.random()-.5)*.4,
      c:palette[(Math.random()*palette.length)|0], life:0, max:90+Math.random()*40
    });
  }
  let raf;
  (function loop(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    let alive=false;
    parts.forEach(p=>{
      if(p.life>p.max) return;
      alive=true; p.life++; p.vy+=p.g; p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr;
      ctx.save(); ctx.globalAlpha=Math.max(0,1-p.life/p.max);
      ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle=p.c;
      ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.5); ctx.restore();
    });
    if(alive) raf=requestAnimationFrame(loop);
    else ctx.clearRect(0,0,innerWidth,innerHeight);
  })();
  return ()=>cancelAnimationFrame(raf);
}

/* ---------------- count-up hook ---------------- */
function useCountUp(value, ms=700){
  const [d,setD]=useState(value); const prev=useRef(value);
  useEffect(()=>{
    const from=prev.current, to=value, t0=performance.now();
    if(from===to) return;
    let raf;
    const step=(t)=>{ const k=Math.min(1,(t-t0)/ms); const e=1-Math.pow(1-k,3);
      setD(Math.round(from+(to-from)*e)); if(k<1) raf=requestAnimationFrame(step); else prev.current=to; };
    raf=requestAnimationFrame(step); return ()=>cancelAnimationFrame(raf);
  },[value,ms]);
  return d;
}

/* ---------------- Ring ---------------- */
function Ring({pct,size=104,sw=8,color="var(--gold)",track="var(--card2)",glow=true}){
  const r=(size-sw)/2, c=2*Math.PI*r, off=c*(1-pct);
  return (
    <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={sw}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
        style={{transition:"stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)",filter:glow?"drop-shadow(0 0 6px rgba(224,174,63,.5))":"none"}}/>
    </svg>
  );
}

/* ================= APP ================= */
export default function App(){
  const [done,setDone]=useState(()=>new Set());
  const [streak,setStreak]=useState({count:1,last:todayStr()});
  const [sound,setSound]=useState(true);
  const [active,setActive]=useState(null);
  const [cele,setCele]=useState(null);
  const [loaded,setLoaded]=useState(false);
  const canvasRef=useRef(null);

  /* load */
  useEffect(()=>{(async()=>{
    try{
      if(window.storage){
        const r=await window.storage.get(STORE_KEY);
        if(r&&r.value){ const s=JSON.parse(r.value);
          if(Array.isArray(s.done)) setDone(new Set(s.done));
          if(typeof s.sound==="boolean") setSound(s.sound);
          if(s.streak){
            const t=todayStr(), y=new Date(Date.now()-864e5).toISOString().slice(0,10);
            if(s.streak.last===t) setStreak(s.streak);
            else if(s.streak.last===y) setStreak({count:s.streak.count+1,last:t});
            else setStreak({count:1,last:t});
          }
        }
      }
    }catch(e){}
    setLoaded(true);
  })()},[]);

  const persist=useCallback((nextDone,nextStreak,nextSound)=>{
    try{ if(window.storage) window.storage.set(STORE_KEY, JSON.stringify({
      done:[...(nextDone??done)], streak:nextStreak??streak, sound:nextSound??sound
    })); }catch(e){}
  },[done,streak,sound]);

  useEffect(()=>{ if(loaded) persist(); },[streak,sound]); // eslint-disable-line

  const xp = [...done].reduce((s,k)=>{
    const [mid,iid]=k.split(":"); const m=MODULES.find(x=>x.id===mid);
    const it=m?.items.find(x=>x.id===iid); return s+(it?itemXp(it):0);
  },0);
  const pct = xp/MAX_XP;
  const rankIdx = RANKS.reduce((acc,r,i)=> pct>=r.pct?i:acc,0);
  const rank = RANKS[rankIdx];
  const nextRank = RANKS[rankIdx+1];
  const modPct = (m)=> m.items.filter(it=>done.has(m.id+":"+it.id)).length/m.items.length;
  const modDone = (m)=> modPct(m)===1;
  const completedCount = MODULES.filter(modDone).length;
  const dispXp=useCountUp(xp), dispPct=useCountUp(Math.round(pct*100));
  const firstOpen = MODULES.find(m=>!modDone(m)) || MODULES[0];

  function toggle(m,it){
    const key=m.id+":"+it.id;
    const next=new Set(done);
    const adding=!next.has(key);
    adding?next.add(key):next.delete(key);
    const wasDone=modDone(m);
    const nowDone=m.items.every(x=>next.has(m.id+":"+x.id));
    setDone(next); persist(next);
    if(adding){
      const beforePct=xp/MAX_XP, afterXp=xp+itemXp(it), afterPct=afterXp/MAX_XP;
      const rankUp = RANKS.reduce((a,r,i)=>afterPct>=r.pct?i:a,0) > RANKS.reduce((a,r,i)=>beforePct>=r.pct?i:a,0);
      if(!wasDone && nowDone){
        sfx.big(sound); burst(canvasRef.current, m.badge?["#E0AE3F","#F6CC63","#34D8B4"]:["#E0AE3F","#F6CC63","#fff"]);
        setTimeout(()=> setCele(
          rankUp ? {type:"rank", rank:RANKS[RANKS.reduce((a,r,i)=>afterPct>=r.pct?i:a,0)].name, badge:m.badge, gain:itemXp(it)}
                 : {type:"module", title:m.title, badge:m.badge, gain:itemXp(it)}
        ), 260);
      } else if(rankUp){
        sfx.big(sound); burst(canvasRef.current,["#E0AE3F","#F6CC63","#34D8B4"]);
        setTimeout(()=> setCele({type:"rank", rank:RANKS[RANKS.reduce((a,r,i)=>afterPct>=r.pct?i:a,0)].name, gain:itemXp(it)}),200);
      } else { sfx.tick(sound); }
    }
  }

  const gotBadge=(mid)=> modDone(MODULES.find(m=>m.id===mid));

  if(!loaded) return (
    <div className="ima-root"><style>{CSS}</style>
      <div style={{display:"grid",placeItems:"center",height:"100vh",color:"var(--muted)",fontFamily:"JetBrains Mono",fontSize:12,letterSpacing:".2em"}}>CHARGEMENT…</div>
    </div>
  );

  return (
    <div className="ima-root">
      <style>{CSS}</style>
      <canvas id="confetti" ref={canvasRef}/>

      {/* HUD */}
      <div className="hud"><div className="hud-row">
        <div className="brand">
          <div className="brand-mark">フ</div>
          <div className="brand-txt"><b>Import Mastery</b><span>FENUA EDITION</span></div>
        </div>
        <div className="hud-chip flame" title="Série">🔥 {streak.count}<span style={{fontFamily:"JetBrains Mono",fontSize:9,color:"var(--muted)"}}>j</span></div>
        <div className={"hud-chip "+(sound?"":"mut")} onClick={()=>{const v=!sound;setSound(v);persist(null,null,v); if(v) sfx.tick(true);}}>{sound?"🔊":"🔇"}</div>
      </div></div>

      <div className="ima-wrap">

        {/* HERO */}
        <div className="hero">
          <div className="eyebrow">Programme · Chine → Tahiti</div>
          <h1>De zéro à ton<br/>premier business <em>rentable</em>.</h1>
          <p className="hero-sub">14 modules. Import, douane PF, marketing & IA — fait au fenua, pour le fenua.</p>

          <div className="hero-mid">
            <div className="ring-wrap">
              <Ring pct={pct} color={pct>=1?"var(--lagoon)":"var(--gold)"}/>
              <div className="ring-num"><b>{dispPct}%</b><span>VALIDÉ</span></div>
            </div>
            <div className="rank-block">
              <div className="rank-label">Ton rang</div>
              <div className="rank-name" style={{color: rankIdx>0?"var(--gold)":"var(--text)"}}>{rank.name}</div>
              <div className="xpbar"><i style={{width: nextRank? Math.min(100,((pct-rank.pct)/(nextRank.pct-rank.pct))*100)+"%" : "100%"}}/></div>
              <div className="xp-meta">
                <span>{dispXp} XP</span>
                <span>{nextRank? `→ ${nextRank.name}` : "MAX ✦"}</span>
              </div>
            </div>
          </div>

          <button className={"cta "+(pct>=1?"done":"")} onClick={()=>{ setActive(firstOpen.id); }}>
            {pct>=1 ? "✦ Parcours terminé — révise quand tu veux" : (completedCount===0? "Démarrer le Module 00" : `Reprendre · ${firstOpen.title}`)}
            <span style={{fontFamily:"JetBrains Mono",fontWeight:700}}>→</span>
          </button>
        </div>

        <div className="stats">
          <div className="stat"><b>{completedCount}<span style={{color:"var(--muted2)",fontSize:14}}>/{MODULES.length}</span></b><span>Modules</span></div>
          <div className="stat"><b style={{color:"var(--gold)"}}>{dispXp}</b><span>XP gagnés</span></div>
          <div className="stat"><b style={{color:"var(--lagoon)"}}>{ALL_BADGES.filter(b=>gotBadge(b.mid)).length}</b><span>Badges</span></div>
        </div>

        {/* PARCOURS */}
        <div className="shead"><h2>Le parcours</h2><div className="ln"/><small>{completedCount}/{MODULES.length} ✓</small></div>

        <div className="spine">
          <div className="spine-track"><div className="spine-fill" style={{height:(pct*100)+"%"}}/></div>
          {MODULES.map(m=>{
            const p=modPct(m), d=p===1, cur=!d && m.id===firstOpen.id;
            return (
              <div key={m.id} className={"node "+(d?"done":cur?"cur":"")}>
                <div className="dot">{d?"✓":m.n}</div>
                <button className="mcard" onClick={()=>setActive(m.id)}>
                  <div className="mcard-top">
                    <h3>{m.title}</h3>
                    {m.badge && <span className="badge-pin" title={m.badge.name}>{m.badge.e}</span>}
                    <span className={"chip "+(d?"done":cur?"cur":"todo")}>{d?"Validé":cur?"En cours":"À faire"}</span>
                  </div>
                  <p>{m.goal}</p>
                  <div className="mini">
                    <div className="mini-bar"><i style={{width:(p*100)+"%"}}/></div>
                    <small>{Math.round(p*100)}%</small>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* BADGES */}
        <div className="shead"><h2>Tes trophées</h2><div className="ln"/><small>{ALL_BADGES.filter(b=>gotBadge(b.mid)).length}/{ALL_BADGES.length}</small></div>
        <div className="bgrid">
          {ALL_BADGES.map(b=>{
            const got=gotBadge(b.mid);
            return <div key={b.mid} className={"badge "+(got?"got":"locked")}>
              <div className="e">{got?b.e:"🔒"}</div><small>{b.name}</small>
            </div>;
          })}
        </div>

        <div className="foot">
          <b>IMPORT MASTERY · FENUA EDITION</b><br/>
          Données douane & fiscalité basées sur les sources officielles PF.<br/>Vérifie toujours les taux à jour : simulateur douane PF · CCISM · DICP.
        </div>
      </div>

      {/* SHEET MODULE */}
      {active && (()=>{ const m=MODULES.find(x=>x.id===active); const p=modPct(m);
        return (
          <>
            <div className="scrim" onClick={()=>setActive(null)}/>
            <div className="sheet">
              <div className="sheet-grab"/>
              <div className="sheet-hd">
                <div style={{display:"flex",alignItems:"center",gap:14}}>
                  <div style={{position:"relative",width:58,height:58,flex:"0 0 auto"}}>
                    <Ring pct={p} size={58} sw={5} color={p>=1?"var(--lagoon)":"var(--gold)"} glow={false}/>
                    <div style={{position:"absolute",inset:0,display:"grid",placeItems:"center",fontFamily:"JetBrains Mono",fontWeight:700,fontSize:13,color:p>=1?"var(--lagoon)":"var(--gold)"}}>{m.n}</div>
                  </div>
                  <div style={{minWidth:0}}>
                    <div className="eyebrow">Module {m.n}{m.badge?` · ${m.badge.e} ${m.badge.name}`:""}</div>
                    <h2>{m.title}</h2>
                  </div>
                </div>
                <div className="sheet-goal"><span>🎯</span><p>{m.goal}</p></div>
              </div>
              <div className="sheet-body">
                {m.items.map(it=>{
                  const on=done.has(m.id+":"+it.id), tool=it.type==="tool";
                  return (
                    <button key={it.id} className={"item "+(tool?"tool ":"")+(on?"on":"")} onClick={()=>toggle(m,it)}>
                      <div className="cbox"><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6"/></svg></div>
                      <div className="item-txt">
                        <h4>{tool && <span className="tool-tag">🎁 Outil offert ·</span>}{it.t}</h4>
                        <p>{it.d}</p>
                      </div>
                      <span className="xp">+{itemXp(it)}</span>
                    </button>
                  );
                })}
                <button className="cta" style={{marginTop:6}} onClick={()=>setActive(null)}>
                  {p>=1?"Module validé ✓ — fermer":"Fermer"}<span style={{fontFamily:"JetBrains Mono"}}>↓</span>
                </button>
              </div>
            </div>
          </>
        );
      })()}

      {/* CELEBRATION */}
      {cele && (
        <div className="cele-scrim" onClick={()=>setCele(null)}>
          <div className={"cele "+(cele.type==="rank"||cele.badge?"":"lagoon")} onClick={e=>e.stopPropagation()}>
            <div className="big">{cele.badge?cele.badge.e : cele.type==="rank"?"🏆":"✓"}</div>
            <div className="eyebrow">{cele.type==="rank"?"Nouveau rang débloqué":"Module validé"}</div>
            <h3>{cele.type==="rank"? cele.rank : cele.title}</h3>
            <p>{cele.badge? `Trophée débloqué : ${cele.badge.name}` : cele.type==="rank"? "Tu montes en puissance. Continue sur ta lancée." : "Un maillon de plus maîtrisé. La marge se construit ici."}</p>
            <div className="gain">+{cele.gain} XP</div>
            <button onClick={()=>setCele(null)}>Continuer →</button>
          </div>
        </div>
      )}
    </div>
  );
}
