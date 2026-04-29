# CHIP-8

CHIP-8 est un langage interprété, initialement conçu pour le COSMAC VIP. Il permet de jouer
a de vieilles versions de classiques tels que PONG ou TRON.

## Usage

Pour charger des ROMs, il suffit de chercher sur internet des ROMs gratuits et libres de droits (cela
ne devrait pas poser de problèmes). Ce dépôt [ici](https://github.com/kripod/chip8-roms) contient une
multitude de jeux (entre autres). Veuillez télécharger les fichiers avec l'extension `.ch8`.

À l'aide de ce [site](https://yaya-cout.github.io/Numworks-connector/#/), vous pouvez transférer vos fichiers
`.ch8` sur la calculatrice. Toute autre extension que `.ch8` ne sera pas reconnue.
Évitez les noms de fichier trop longs, car cela risque de ne pas rentrer sur l'écran. 
Ex. `Tetris.ch8`

## Contrôles

CHIP-8 utilise un clavier hexadécimal de 4x4 touches.
Il est ici mis à gauche, avec son équivalent sur la
calculatrice à droite.

    1 2 3 C         7 8 9 (
    4 5 6 D         4 5 6 x
    7 8 9 E         1 2 3 +
    A 0 B F         0 . E A     (NB: E et A correspondent aux touches x10^ et Ans)

Chaque jeu utilise les touches qu'il souhaite, mais seulement celles-là.

Touches concernant l'émulateur:

| **Key**           | **Action**                        |
| ----------------- | --------------------------------- |
| `OK`              | Menu de sélection de ROM          |
| `Retour`          | Réinitialise le ROM               |
| `Var`             | Basculer le débogage              |
| `Outils`          | Pause et reprise                  |
| `Effacer`         | Avance une instruction (en pause) |

Le débogage et l'avancement d'une instruction n'est pas utile pour l'utilisateur moyen.

## Téléchargement

Vous pouvez télécharger l'application avec ce lien:

- [CHIP-8 v1.0.0](https://nwagyu.org/assets/apps/chip-8-1.0.0.nwa), Première version

## Installation

Pour installer l'application, suive ce guide:
[comment installer](../help/how-to-install.md)

## Code source

Le code source est disponible [ici](https://github.com/MartiPuigV/chip-8-NWA).
