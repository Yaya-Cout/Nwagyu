# Compressor

Cette application vous permet de compresser des fichiers directement depuis
votre calculatrice NumWorks, sans passer par un ordinateur, avec des ratios de
compression autour de 2. Cela vous permet de stocker 2 fois plus de fichiers que
vous n'auriez pu le faire sans !

## Comment utiliser l'application

En ouvrant cette application, vous devez choisir entre 2 modes, qui sont
complémentaires : "compress" et "decompress"

### Compresser un fichier

Pour compresser un fichier, appuyez sur le bouton `1` de la calculatrice

Ensuite, vous tomberez sur un sélecteur de ficher. Sélectionnez simplement le
fichier que vous voulez compresser avec les touches haut/bas puis appuyez sur OK
ou EXE.

Si tout a fonctionné, l'application devrait quitter quasiment immédiatement.
Sinon, lisez la section [dépannage](#dépannage).

Si vous voulez de nouveau accéder au fichier compressé, lisez la section
suivante pour le décompresser.

### Décompresser un fichier

Pour décompresser un fichier, appuyez sur le bouton `2` de la calculatrice

Ensuite, vous tomberez sur un sélecteur de ficher. Sélectionnez simplement le
fichier que vous voulez décompresser avec les touches haut/bas puis appuyez sur
OK ou EXE.

Si tout a fonctionné, l'application devrait quitter quasiment immédiatement, et
votre fichier sera de nouveau disponible. Sinon, lisez la section
[dépannage](#dépannage).

## Téléchargement

Vous pouvez télécharger l'application Compressor depuis ce lien :

- [Compressor v1.0.1](https://yaya-cout.github.io/Nwagyu/assets/apps/compressor-1.0.1.nwa),
  correction de crashs et bugs lorsque le stockage est plein
- [Compressor v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/compressor-1.0.0.nwa)

## Installation

Pour installer l'application Compressor, suivez les instructions dans le guide
[comment installer](../help/how-to-install.md).

## Dépannage

Voici des solutions à certains problèmes courants que vous pouvez rencontrer
avec cette application

### Error: Storage is full

Vous n'avez pas assez de stockage libre pour stocker le nouveau fichier. Cela
devrait principalement arriver en décompressant des fichiers. Dans ce cas,
essayez de compresser ou supprimer d'autres fichiers avant de réessayer

Cette erreur affiche également l'espace disponible requis et actuel pour vous
aider à visualiser combien de mémoire vous devez libérer.

Notez que vous ne pouvez pour le moment pas supprimer de fichier compressé sans
le décompresser sans ordinateur, voir [Yaya-Cout/Compressor#2](https://codeberg.org/Yaya-Cout/Compressor/issues/2).

### Error: Couldn't write file

Vous n'avez pas assez de place pour stocker le nouveau fichier. Cela ne devrait
jamais arriver car vous obtiendriez `Error: Storage is full` à la place. Si vous
obtenez cette erreur, le fichier est définitivement perdu.

Si cela devait arriver, merci d'ouvrir un [ticket](https://codeberg.org/Yaya-Cout/Compressor/issues)
pour investiguer ce problème.

### Error: Output file already exists

Cela signifie que le fichier à écrire existe déjà.

Lors de la compression, cela signifie que vous avez déjà un fichier compressé
avec le même nom. Dans ce cas, renommez le fichier que vous voulez compresser
depuis l'application Python et réessayez.

Lors de la décompression, cela signifie que vous avez déjà un fichier
décompressé avec le même nom. Dans ce cas, renommez le fichier décompressé
existant depuis l'application Python et réessayez.

### Error: Compression/Decompression failed

Cette erreur ne devrait pas arriver dans la plupart des cas.

Si vous obtenez cette erreur lors de la compression, cela signifie que le fichier
compressé est plus de 10 octets plus lourd que le fichier original, auquel cas
compresser ce fichier est inutile.

Si vous obtenez cette erreur lors de la décompression, cela signifie que le
fichier décompressé est plus gros que 60 Ko, plus gros que la taille maximum
actuelle du stockage sur les calculatrices verrouillées.

Cette erreur peut aussi signifier que le fichier compressé est invalide, ce qui
ne devrait pas arriver sauf si vous modifiez le fichier en utilisant une autre
façon. Au moment où j'écris cette application, aucun outil de ce type n'existe
sans ordinateur donc cela ne devrait pas être un problème.

### Compresser d'autres fichiers que des scrips Python

La compression de d'autres fichiers que du Python n'est pas implémentée car il
n'y aurait pas de réel avantage à l'avoir.

Voici une liste des fichiers présents sur une NumWorks :

- Fichiers internes (paramètres, variables de calculs, fonctions, équations…)
  qui sont souvent utiles et légers, et ne bénéficieraient pas vraiment de la
  compression
- Les sauvegardes d'émulateurs, qui sont déjà compressées par défaut avec le
  même algorithme que cette application
- Les sessions KhiCAS, qui ne sont pas implémentées car non rependues. La
  plupart des gens n'utilisent qu'une seule session, qui devrait être
  compressée/décompressée à chaque lancement de KhiCAS. Cela serait mieux
  implémenté en interne par KhiCAS, comme pour les sauvegardes d'émulateur

La liste des fichiers doit également rester lisible pour faciliter la
navigation.

### Accès depuis un ordinateur

Pour gérer les fichiers depuis un ordinateur, vous pouvez utiliser n'importe
quel outil capable d'afficher les fichiers de la calculatrice, y compris ceux
qui ne sont pas des scripts Pythons, comme

- [Upsilon Workshop](https://yaya-cout.github.io/Upsilon-Workshop/calculator)
  (seulement suppression et renommage, pas de téléchargement de fichier
  compressé)
- [NumWorks Connector](https://yaya-cout.github.io/Numworks-connector/#/),
  gère tout, y compris le renommage, la suppression, la sauvegarde et la
  restauration sans aucun compte

Notez que pour le moment, aucun de ces outils ne permet de décompression
automatique.

Les fichiers compressés *devraient* être décompressibles avec LZ4 sur un
ordinateur, mais je n'ai pas testé.

## Code source

Le code source de Compressor est disponible
[ici](https://codeberg.org/Yaya-Cout/Compressor).
