# Conway

Le Jeu de la Vie de Conway est un jeu datant de 1970.
Après un placement initial de cellules vivants sur un échiquier
de cellules mortes, le jeu se poursuit tout seul, affectant à chaque
cellule la vie ou la mort, selon des règles de voisinage.
Il existe des configurations de cellules très intéressantes qui ont été
découverts depuis bien longtemps déjà.

## Fonctionnalités

- Un menu qui te permet de mettre en pause la simulation et de modifier
les cellules
- Un système de sauvegarde de cellules. On peut selectionner une portion de
la simulation, qui sera sauvegardé comme fichier sur la calculatrice, que l'on
pourra ensuite venir coller n'importe ou sur la simulation.
- Un script python dans le repo originel du code source permet de transformer une
image en noir et blanc en fichier de sauvegarde, que l'on peut ensuite greffer au
programme si on le compile en activant 2 lignes du code source.

## Contrôles

Voici les contrôles pour la version 1.0.0:

La touche OK permet de basculer entre le menu editeur et la simulation

Lorsque l'on est dans le menu, les flèches permettent de déplacer un curseur.
La boîte à outils et la touche à sa droite (effacer) permettent de faire vivre
ou mourir (respectivement) la cellule sous le curseur.

En appuyant sur shift, on place le premier point de la zone de selection. En reappuyant,
le deuxieme point démarque le rectangle qui sera copié. Le fichier local s'appelle "pattern.cwp"
La touche Ans (reponse) copie le contenu du fichier au niveau du curseur. 

La vitesse de la simulation peut être modifiée avec les touches + et -.
La touche + augmente le temps entre chaque image (ralenti la simlation)
et la touche - fait l'inverse.

En appuyant sur la touche diviser, la couleur des cellules vivantes change entre 3 couleurs:

Blanc (0xFFFF) Vert (0xBECA) Abricot (0xFDCF)

(Les couleurs vert et abricot viennent d'une palette de GameBoy)

Un guide mis-à-jour se trouve dans le repo du code source, lien en dessous.

## Téléchargement

Vous pouves télécharger l'application avec ce lien:

- [Conway v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/conway-1.0.0.nwa), Version initiale

## Installation

Pour installer l'application, veuillez suivres les instructions sur
[comment installer](../help/how-to-install.md) (guide).

## Source code

Le code source est disponible [ici](https://github.com/MartiPuigV/Conway-NWA)
