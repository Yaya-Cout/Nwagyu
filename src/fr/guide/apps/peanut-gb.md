# Peanut GB

Peanut GB est un émulateur Gameboy. Vous voulez jouer à vos cartouches
originales Game Boy sur votre calculatrice ? Cette application est faite pour
vous !

## Comment obtenir des jeux

Nous ne pouvons pas vous donner de jeux, pour des raisons légales. Cependant,
vous pouvez télécharger des jeux depuis Internet facilement. Une recherche comme
"gameboy roms" devrait vous donner beaucoup de résultats. Vous pouvez également
extraire vos propres cartouches.

Vous devrez ajouter votre rom en tant que fichier externe. Pour cela, suivez
les instructions dans le guide [comment installer](../help/how-to-install.md).

## Comment jouer

C'est plutôt intuitif, vu que les touches de la NumWorks ressemblent beaucoup
à celles d'une Game Boy. Cependant, voici une liste des connexions entre celles
de la NumWorks et celles de la Game Boy :

| Game Boy                                                 | NumWorks       |
| -------------------------------------------------------- | -------------- |
| Flèches                                                  | Flèches        |
| A                                                        | Retour         |
| B                                                        | OK             |
| Select                                                   | Shift          |
| Select (Alternative, voir ci-dessous)                    | Home           |
| Start                                                    | Effacer        |
| Start (Alternative)                                      | Alpha          |
| Start (Alternative, voir ci-dessous)                     | On/Off         |

Pour modifier le comportement de l'émulateur, vous pouvez utiliser ces touches :

| Touche         | Action                                                          |
| -------------- | --------------------------------------------------------------- |
| 1              | Utiliser la palette originale Game Boy                          |
| 2              | Utiliser une palette en échelle de gris                         |
| 3              | Utiliser une palette en échelle de gris inversée                |
| 4              | Utiliser la palette Peanut-GB originale                         |
| +              | Afficher en plein écran                                         |
| -              | Afficher avec le ratio original                                 |
| 7              | Afficher le temps de traitement par image                       |
| 9              | Activer les touches On/Off et Home, et éteindre la calculatrice |
| Boite à outils | Écrire la sauvegarde actuelle sur le stockage                   |
| 0              | Écrire la sauvegarde actuelle sur le stockage et quitter        |

## Téléchargement

Vous pouvez télécharger l'application Peanut-GB depuis ce lien :

- [Peanut-GB v1.2.2](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgb-1.2.2.nwa), correction de problèmes de mémoire lors de l'écriture des sauvegardes
- [Peanut-GB v1.2.1](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgb-1.2.1.nwa), correction de problèmes de mémoire lors de l'écriture des sauvegardes
- [Peanut-GB v1.2.0](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgb-1.2.0.nwa), amélioration de performances, limiteur d'images, touches On/Off et Home
- [Peanut-GB v1.1.0](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgb-1.1.0.nwa), sauvegarde, plein écran avec ratio, nouvelles palettes, touche alpha pour start
- [Peanut-GB v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgb-1.0.0.nwa)

Peanut-GBC est une version de Peanut-GB avec affichage en couleur des jeux
Gameboy Color. Pour des jeux Gameboy traditionnelle, privilégiez Peanut-GB, qui
est plus optimisé et rapide.

- [Peanut-GBC v1.1.1](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgbc-1.1.1.nwa), équivalent à Peanut-GB v1.2.2
- [Peanut-GBC v1.1.0](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgbc-1.1.0.nwa), sauvegarde, équivalent à Peanut-GB v1.2.1
- [Peanut-GBC v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgbc-1.0.0.nwa)

::: warning
Peanut-GBC nécessite plus de RAM et de temps processeur, donc certains
jeux ne vont pas marcher du tout, ou alors pas en temps réel (par exemple, 1,5
seconde dans le monde réel vont durer 1 seconde dans le jeu).
La plupart des jeux Gameboy Color peuvent tourner sur Peanut-GB normal en
échelle de gris avec des meilleures performances.
:::

## Installation

Pour installer l'application Peanut-GB, suivez les instructions dans le guide
[comment installer](../help/how-to-install.md).

## À propos des touches On/Off et Home

Les applications externes ne peuvent pas utiliser les touches On/Off et Home
en contrôle car le noyau détecte que ces touches sont pressées et réagit en
quittant l'application (et en arrêtant la calculatrice dans le cas de la touche
On/Off).

En tant qu'utilisateur, la seule chose que vous voulez probablement savoir est
qu'il vous suffit d'appuyer sur la touche "9" du clavier pour activer les
touches On/Off et Home. Cela va éteindre la calculatrice, donc vous devrez
appuyer sur On/Off pour la rallumer après ça pour restaurer votre jeu. Vous
devez faire cela à chaque fois que vous utilisez l'émulateur.

Cela a aussi en bel effet secondaire de permettre d'éteindre la calculatrice en
pleine partie sans quitter l'émulateur, ce qui peut servir dans beaucoup de
situations. Par exemple, si vous devez temporairement éteindre la calculatrice
sans avertissement si le prof est en train de venir, tout ce que vous avez à
faire est d'appuyer sur le bouton "9" (mais vous ne jouez pas pendant les cours,
hein ? _-insérer le meme de Anakin et Padmé ici-_)

<!--
TODO: Create an English-only developer documentation for technical details
like storage and On/Off keys
-->

Pour les détails techniques de ce qu'il se passe lorsque vous appuyez sur la
touche 9, voir ci-dessous :

Il n'y a pas de fonction pour désactiver explicitement ce comportement
indésirable. Pour contourner ce problème, nous appelons la méthode du noyau pour
activer l'USB, qui, parmi d'autres actions, va désactiver les interruptions et
la gestion des touches On/Off et Home. Cela désactive également le clavier, donc
nous devons le rallumer. Heureusement, quand la calculatrice se rallume, le
clavier est réinitialisé, mais pas les interruptions.

C'est un léger "hack", mais au moins, ça fonctionne et est mieux que rien. Une
implémentation officielle de NumWorks ne ferait pas de mal, mais qui sait s'ils
prévoient d'ajouter des API pour les applications externes… Il n'y a pas d'API
officielle pour lire le stockage, donc les applications externes lisent
directement la RAM de la même manière que les ordinateurs le font pour lire et
écrire des fichiers dans la calculatrice, donc nous sommes très loin d'avoir une
méthode pour désactiver On/Off et Home.

Une explication plus complète est disponible dans la
[documentation](../../../reference/apps/onoff-home.md) (en anglais).

## Code source

Le code source de Peanut-GB à partir de la v1.1.0 est disponible
[ici](https://codeberg.org/Yaya-Cout/peanutgb).

Le code source de Peanut-GB v1.0.0 est disponible
[ici](https://github.com/nwagyu/peanutgb/).

Le code source de Peanut-GBC à partir de la v1.1.0 est disponible
[ici](https://codeberg.org/Yaya-Cout/peanutgbc).

Le code source de Peanut-GBC v1.0.0 est disponible
[ici](https://github.com/Lisra-git/peanutgb/).
