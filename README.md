# Stratégie XAUUSD : MSS + Fibo + Retest + FVG

Une stratégie TradingView (Pine Script v6) pour l'or (XAUUSD) qui automatise ce setup :

1. **MSS** (Market Structure Shift) : changement de structure du marché
2. **Fibo** tracé du **début de l'impulsion à sa fin**
3. **Retest** du prix dans la zone Fibo
4. **Confirmation par un FVG** (Fair Value Gap) avant d'entrer

Fichier : [`pine/xauusd_mss_fibo_fvg.pine`](pine/xauusd_mss_fibo_fvg.pine)

---

## Les règles

### 1. MSS : le changement de structure
- Les swings (sommets et creux) sont repérés par des pivots (`Longueur des swings`, 5 par défaut).
- **MSS haussier** : en tendance baissière, une bougie **clôture** au-dessus du dernier sommet (lower high).
- **MSS baissier** : en tendance haussière, une bougie **clôture** sous le dernier creux (higher low).
- Une simple mèche ne suffit pas, il faut une clôture.
- L'impulsion doit mesurer au moins `1.5 × ATR`, sinon le MSS est ignoré (cela filtre les petites cassures dans le bruit).
- Option : `Accepter aussi les BOS` permet aussi de trader les cassures dans le sens de la tendance (continuation).

### 2. Fibo : du début à la fin de l'impulsion
- **Début (niveau 1)** : le point extrême d'où part l'impulsion, c'est-à-dire le creux le plus bas (pour un achat) entre le swing cassé et la cassure.
- **Fin (niveau 0)** : le plus haut atteint par l'impulsion.
- Tant que le prix n'a pas touché la zone, la fin de l'impulsion suit les nouveaux plus hauts et le Fibo est redessiné.
- Niveaux affichés : 0, 0.5, 0.618, 0.705, 0.786 et 1.

### 3. Retest dans la zone
- La zone de retest va de **0.618 à 0.786** par défaut (la zone OTE). Les deux bornes se règlent.
- Le setup est **annulé** dans trois cas :
  - le prix casse l'origine de l'impulsion (niveau 1) ;
  - la zone n'est pas touchée dans les 50 bougies qui suivent ;
  - un MSS se produit dans le sens opposé.

### 4. Confirmation FVG
- Après le retest, il faut un **FVG dans le sens du MSS** :
  - pour un achat, le plus bas de la bougie 3 est au-dessus du plus haut de la bougie 1, et la bougie 2 est haussière ;
  - pour une vente, c'est l'inverse.
- Par défaut, le FVG doit **partir de la zone** : l'une des deux premières bougies du FVG a touché la zone.
- Le FVG doit apparaître dans les **10 bougies** qui suivent le retest. Passé ce délai, le setup est annulé.
- **Entrée** : à la clôture de la bougie qui valide le FVG.

### Gestion du risque
| Élément | Par défaut | Options |
|---|---|---|
| Stop loss | Sous/au-dessus de l'extrême du retest + 0.2 × ATR | Ou derrière l'origine de l'impulsion (Fibo 1) |
| Take profit | R:R de 2 | Extension Fibo -0.272, ou fin de l'impulsion (Fibo 0) |
| Filtre R:R | Trade ignoré si R:R < 1.5 | — |
| Taille de position | 1 % du capital risqué par trade | — |
| Session | 08:00–18:00, heure de Paris (Londres + New York) | Désactivable |

---

## Installation sur TradingView
1. Ouvrir un graphique **XAUUSD** (par exemple OANDA:XAUUSD), en **M5 ou M15**.
2. Ouvrir l'**Éditeur Pine**, coller le contenu de `pine/xauusd_mss_fibo_fvg.pine`, puis cliquer sur **Ajouter au graphique**.
3. Les résultats du backtest sont dans le **Testeur de stratégie**.
4. Pour recevoir les alertes : Créer une alerte → Condition « XAU MSS/FVG » → « Appels de fonction alert() uniquement ».

Sur le graphique :
- une ligne pointillée et l'étiquette **MSS** marquent le swing cassé ;
- un Fibo montre l'impulsion, avec la zone de retest colorée (elle devient grise si le setup est annulé) ;
- une boîte **FVG** marque la confirmation, avec les lignes de SL (rouge) et de TP (vert) ;
- un tableau en haut à droite indique l'étape en cours : attente d'un MSS, puis du retest, puis du FVG.

## Conseils de réglage
- **Spread et slippage** : réglez-les dans les propriétés de la stratégie selon votre broker. Sur l'or, ils pèsent beaucoup en M1 et M5.
- **Taille des positions** : `Pas de quantité` et la valeur du point dépendent du symbole. Sur OANDA:XAUUSD, 1 unité = 1 once.
- **Multi-timeframe** : la méthode classique consiste à repérer le MSS et le Fibo en M15 ou H1, puis à attendre le FVG en M1 ou M5. Ce script travaille sur un seul timeframe. Pour vous en approcher, augmentez `Longueur des swings` et `Impulsion minimale`.
- Testez la stratégie sur plusieurs mois et en démo avant de l'utiliser en réel.

> ⚠️ Ce script est un outil d'analyse et de backtest, pas un conseil en investissement. Le trading de l'or à effet de levier comporte un risque élevé de perte en capital.
