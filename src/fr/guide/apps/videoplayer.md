# Video Player

Cette application est un lecteur de vidéo pour les calculatrices NumWorks. Elle vous
permet de lire n'importe quelle vidéo qui a été convertie dans un format compatible.

## Téléchargement

Les versions officielles sont disponibles sur [GitHub Releases](https://github.com/SaltyMold/Video-Player-for-Numworks/releases).

Si vous préférez, vous pouvez utiliser ce lien direct :

- [VideoPlayer 1.1.2](https://yaya-cout.github.io/Nwagyu/assets/apps/videoplayer-1.1.2.nwa), moins d'utilisation de la mémoire et corrections mineures
- [VideoPlayer 1.1.1](https://yaya-cout.github.io/Nwagyu/assets/apps/videoplayer-1.1.1.nwa)

## Comment obtenir des vidéos

Vous pouvez prendre des vidéos d'exemple depuis le [dossier samples](https://github.com/SaltyMold/Video-Player-for-Numworks/tree/main/samples)
sur le dépôt GitHub.
Ou convertir vos propres vidéos en suivant les instructions ci-dessous.

Pour convertir une vidéo, vous pouvez utiliser l'outil en ligne de commande `ffmpeg`.
Voici une commande exemple supposant que votre vidéo s'appelle `input.mp4`
dans le répertoire courant :

Gardez la résolution à 320×240. Ajustez `-q:v`, `fps=` et `-t` pour la qualité,
les fps et la durée.

Avec recadrage :

```bash
ffmpeg -i input.mp4 \
  -vf "scale=320:240:force_original_aspect_ratio=increase,crop=320:240,setsar=1:1,fps=15" \ # Crop à 320x240
  -t 00:00:30 \ # Limiter à 30 secondes
  -vcodec mjpeg \ # Utiliser le codec MJPEG
  -q:v 24 -an \ # Qualité et pas d'audio
  output.mjpeg
```

Sans recadrage :

```bash
ffmpeg -i input.mp4 \
  -vf "scale=320:240:force_original_aspect_ratio=increase,setsar=1:1,fps=15" \ # Scale à 320x240
  -t 00:00:30 \ # Limiter à 30 secondes
  -vcodec mjpeg \ # Utiliser le codec MJPEG
  -q:v 24 -an \ # Qualité et pas d'audio
  output.mjpeg
```

Cette commande convertira votre fichier `input.mp4` en un fichier `output.mjpeg`.

Une vidéo en 320x240 15fps t30 q24 fait environ 1.2MB.

## Comment utiliser l'application

| Touche| Action        |
|-------|---------------|
| Back  | Quit app      |
| Shift | Change FPS    |
| EXE   | Debug mode    |

Si vous changez les fps, ils sont sauvegardés dans le stockage de la calculatrice pour la prochaine fois.

Ça tourne autour de ~35 fps sur n0120, et autour de ~15 fps sur n0110 et n0115

## Installation

Pour installer l'application Video Player, suivez les instructions dans le guide
[comment installer](../help/how-to-install.md) pour l'installer avec le fichier
`mjpeg`.

## Pourquoi ne pas utiliser Playa ?

- Playa n'est pas open source tandis que VideoPlayer l'est.
- Le binaire de Playa pèse 249KB. Tandis que VideoPlayer ne pèse que 27KB.
- VideoPlayer offre plus de fonctionnalités comme le changement de fps à la
  volée pour s'adapter à la vidéo convertie,
  et un mode debug pour vérifier les performances. Les préférences sont
  sauvegardées dans le stockage de la calculatrice.
- La conversion des vidéos pour VideoPlayer est plus flexible car on peut
  choisir les fps sur la calculatrice,
  la video n'est donc pas accélérée jusqu'aux limites de la calculatrice. Cela
  laisse donc du stockage pour changer d'autres paramètres.

## Code source

Le code source de VideoPlayer est disponible
[ici](https://github.com/SaltyMold/Video-Player-for-Numworks/).
