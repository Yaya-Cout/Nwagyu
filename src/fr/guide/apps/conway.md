# Conway

Le Jeu de la Vie de Conway est un jeu datant de 1970.
Après un placement initial de cellules vivants sur un échiquier
de cellules mortes, le jeu se poursuit tout seul, affectant à chaque
cellule la vie ou la mort, selon des règles de voisinage.
Il existe des configurations de cellules très intéressantes qui ont été
découverts depuis bien longtemps, comme le [glider](https://conwaylife.com/wiki/Glider) (page en anglais).

## Fonctionnalités

- Un menu qui permet de mettre en pause la simulation et de modifier
les cellules
- Un système de sauvegarde de cellules. On peut selectionner une portion de
la simulation, qui sera sauvegardé comme fichier sur la calculatrice, que l'on
pourra ensuite venir coller n'importe où sur la simulation.
- Un script python dans le dépôt original du code source permet de transformer une
image en noir et blanc en motif de cellules que l'on peut ensuite intégrer au programme (voir ci-dessous)
- 3 palettes de couleurs
- Un fichier de configuration persistent
- De nombreux paramètres modifiables, tels que la durée d'une itération ou l'échelle
  de la simulation.

## Contrôles

|**Touche**        |**Action**|
| ---------------- | ------------------------------------------------------------------- |
| `OK`             | Permet de basculer entre l'éditeur et la simulation                 |
| `Flèches`        | Permettent de déplacer le curseur (mode éditeur)                    |
| `Boîte à outils` | Rend la cellule sous le curseur vivante (mode éditeur)              |
| `Effacer`        | Rend la cellule sous le curseur morte (mode éditeur)                |
| `Shift`          | Permet de séléctionner une zone à copier sur le presse-papier       | 
| `Ans`            | Copie le contenu du presse-papier au niveau du curseur              |
| `+` & `-`        | Permet de changer la durée d'une itération de la simulation         |
| `÷`              | Alterne entre copie stricte et transparente (voir section Détails)  |
| `Alpha`          | Change de palette, parmi les 3 palettes (voir section Détails)      |
| `×`              | Copie l'entièreté de l'écran au presse-papier                       |
| `(` & `)`        | Change l'échelle de la simulation (voir section Détails)            |
| `EXE`            | Sauvegarde les configurations (palette, durée d'itération, etc)     |

Un guide mis à jour se trouve dans le dépôt du code source, lien [ci-dessous](#code-source).

## Détails

### Copie stricte et transparente

- Une copie stricte du presse-papier copie autant les cellules mortes que vivantes.
- Une copie transparent ne copie que les cellules vivantes.

### Palettes disponibles

- Blanc
- Vert
- Abricot / Beige

Les couleurs vert et abricot ont été prises [ici](https://www.deviantart.com/advancedfan2020/art/Game-Boy-Palette-Set-Color-HEX-Part-12-920496174)

### Résolution de simulation

::: warning
Les effets de la modification de la résolution ne se font qu'après avoir sauvegardé ses configurations,
en appuyant sur `EXE`, puis en sortant et reouvrant l'application.
:::

La résolution de la simulation se mesure en pixels par cellule et compte actuellement 4 valeurs possibles,
soit des carrés de 2, 4, 5 et 8 pixels par cellule. Par défaut, la valeur de 5 pixels par cellule est choisie. 

## Téléchargement

Vous pouves télécharger l'application avec ce lien:

- [Conway v1.1.0](https://yaya-cout.github.io/Nwagyu/assets/apps/conway-1.1.0.nwa), Correction de bugs et interface améliorée
- [Conway v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/conway-1.0.0.nwa), Version initiale

## Installation

Pour installer l'application, veuillez suivres les instructions sur
[comment installer](../help/how-to-install.md) (guide).

## Utilisation d'une image

Veuillez télécharger l'application acceptant `external_data`. Avec le script python fourni sur mon dépôt (voir ci-dessous),
générez un fichier `.cwp`, qui sera utilisé comme fichier externe lors du processus d'installation, (voir guide ci-dessus).

## Code source

Le code source est disponible [ici](https://github.com/MartiPuigV/Conway-NWA)
