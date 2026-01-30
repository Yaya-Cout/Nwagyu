# Conway

Le Jeu de la Vie de Conway est un jeu datant de 1970.
Après un placement initial de cellules vivants sur un échiquier
de cellules mortes, le jeu se poursuit tout seul, affectant à chaque
cellule la vie ou la mort, selon des règles de voisinage.
Il existe des configurations de cellules très intéressantes qui ont été
découverts depuis bien longtemps déjà.

## Fonctionnalités

- Un menu qui permet de mettre en pause la simulation et de modifier
les cellules
- Un système de sauvegarde de cellules. On peut selectionner une portion de
la simulation, qui sera sauvegardé comme fichier sur la calculatrice, que l'on
pourra ensuite venir coller n'importe où sur la simulation.
- Un script python dans le dépôt original du code source permet de transformer une
image en noir et blanc en fichier de sauvegarde, que l'on peut ensuite greffer au
programme si on le compile en activant 2 lignes du code source.
- 3 palettes de couleurs
- Un fichier de configuration persistent
- De nombreux paramètres modifiables, tels que la durée d'une itération ou l'échelle
  de la simulation.

## Contrôles

- `OK`: Permet de basculer entre l'editeur et la simulation
Lorsque l'on est dans le menu, les flèches permettent de déplacer un curseur.

- `Boîte à outils`:  Rend la cellule sous le curseur vivante (mode editeur)

- `Effacer` Rend la cellule sous le curseur morte (mode editeur)

- `Shift`: Permet de placer le premier point de la zone de selection. En reappuyant,
le deuxieme point démarque le rectangle qui sera copié.

- `Ans` (reponse): copie le contenu du presse-papier au niveau du curseur.

- `+` & `-`: Permettent d'augmenter et diminuer la durée d'une itération de la simulation

- `/` (division): Alterne entre copie stricte et transparente. Une copie stricte du presse-papier
  copie également les cellules mortes. Une copie transparente ne copie que les cellules vivantes.

- `Alpha`: Change de palette, entre les 3 palettes:

Blanc
Vert
Abricot / Beige

Les couleurs vert et abricot ont été prises [ici](https://www.deviantart.com/advancedfan2020/art/Game-Boy-Palette-Set-Color-HEX-Part-12-920496174)

- `x` (multiplication): Copie l'écran en entier au presse-papier.

- `(` & `)`: Change l'échelle de la simulation. Ne prend effet qu'après avoir sauvegardé les configurations
  (voir ci-dessous) et relancé l'application.

- `EXE`: Sauvegarde les configurations (palette, durée d'itération, etc) localement.

Un guide mis-à-jour se trouve dans le repo du code source, lien en dessous.

## Téléchargement

Vous pouves télécharger l'application avec ce lien:

- [Conway v1.1.0](https://yaya-cout.github.io/Nwagyu/assets/apps/conway-1.1.0.nwa), Bugs résolus et interface améliorée
- [Conway v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/conway-1.0.0.nwa), Version initiale

## Installation

Pour installer l'application, veuillez suivres les instructions sur
[comment installer](../help/how-to-install.md) (guide).

Pour implémenter vos fichiers issus d'images (par le script python), veuillez modifier le code source pour
qu'il compile avec "external_data" (une ou deux lignes sont à activer). Le fichier issu du script devrait se
situer à "src/input.txt" par défaut. Une version qui accepte un fichier externe sera mis à disposition bientôt,
probablement sur le repo source ci-dessous.

## Source code

Le code source est disponible [ici](https://github.com/MartiPuigV/Conway-NWA)
