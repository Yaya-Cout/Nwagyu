# Playa

Playa est une lecteur de vidéo pour NumWorks ! Avec cette application, vous
pouvez charger une vidéo sur votre calculatrice et la lire !

## Comment obtenir des vidéos

Vous ne pouvez pas utiliser des vidéos normales. À la place, vous devez
convertir votre vidéo en une séquence d'images. Une vidéo déjà convertie est
disponible [ici](https://yaya-cout.github.io/Nwagyu/assets/video.bin).

Pour convertir une vidéo, vous pouvez utiliser l'outil en ligne de commande
`ffmpeg`. Voici un exemple supposant que votre vidéo s'appelle `input.mp4` dans
le dossier actuel :

```bash
ffmpeg -i input.mp4 \
  -vf scale=320:240,setsar=1:1,fps=15 \ # Resize video to 320x240@15fps
  -t 00:00:10 \ # Only keep the first ten second
  -vcodec mjpeg \ # Use the MJPEG codec
  output.mjpeg
```

Cette commande va convertir votre fichier `input.mp4` en un `output.mjpeg`.
Ensuite, vous pouvez simplement installer `playa.nwa` avec la vidéo
`output.mjpeg` depuis l'installateur de NumWorks. Suivez les instructions dans
le guide [comment installer](../help/how-to-install.md) pour plus de détails.

## Téléchargement

Vous pouvez télécharger l'application Playa depuis ce lien :

- [Playa](https://yaya-cout.github.io/Nwagyu/assets/apps/playa.nwa)

## Installation

Pour installer l'application Playa, suivez les instructions dans le guide
[comment installer](../help/how-to-install.md).
