# Chipexa

Chipexa est un éditeur hexadécimal et émulateur CHIP-8 pour NumWorks :
écrivez des programmes CHIP-8 opcode par opcode directement sur votre
calculatrice, puis exécutez-les instantanément. Cette
application est faite pour *écrire* des programmes CHIP-8 n'importe où — sans
ordinateur.

## Fonctionnalités

- Éditeur hexadécimal avec une cellule par opcode 16 bits, adresses affichées
  à partir de `0x200`, et opcodes colorés selon leur famille d'instructions
- Émulateur CHIP-8 intégré (écran 64x32, clavier 16 touches classique)
- Sauvegarde et chargement des programmes en fichiers `.ch8` (3584 octets
  maximum) dans le stockage de la calculatrice
- Sauts de ligne visuels optionnels pour structurer le code, sauvegardés dans
  un fichier annexe `.lay`

## Utilisation

Tapez les opcodes chiffre par chiffre ; une cellule se colore une fois ses
4 chiffres saisis, et une nouvelle cellule vide est ajoutée automatiquement.
Appuyez sur `EXE` pour lancer le programme, `Back` pour revenir à l'éditeur.

## Contrôles

### Éditeur

| Touche                        | Action                                        |
| ----------------------------- | --------------------------------------------- |
| 0-9                           | Saisir les chiffres hexadécimaux 0-9          |
| Deuxième rangée du clavier    | Saisir les chiffres hexadécimaux A-F          |
| Flèches                       | Déplacer le curseur                           |
| EXE / OK                      | Lancer le programme                           |
| Backspace                     | Effacer le dernier chiffre de la cellule      |
| +                             | Insérer une cellule vide avant le curseur     |
| -                             | Supprimer la cellule courante                 |
| Ans                           | Alterner un saut de ligne visuel              |
| Toolbox                       | Sauvegarder (nom saisi avec les lettres alpha)|
| Var                           | Charger / supprimer des fichiers `.ch8`       |
| Back                          | Quitter l'application                         |

### Émulateur

Le clavier 16 touches du CHIP-8 est réparti ainsi : `0`-`9` sur les touches
numériques, et `A`-`F` sur la deuxième rangée du clavier.

| Touche     | Action              |
| ---------- | ------------------- |
| Back       | Revenir à l'éditeur |

## Téléchargement

Vous pouvez télécharger l'application Chipexa depuis ce lien :

- [Chipexa v1.0.0](/assets/apps/chipexa-1.0.0.nwa), Première version

## Installation

Pour installer l'application, suivez les instructions du guide
[comment installer](../help/how-to-install.md).

## Code source

Le code source est disponible [ici](https://github.com/ScratchY98/CHIP-8-HEXA-Numworks).
