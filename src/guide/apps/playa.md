# Playa

Playa is a video player for NumWorks! With this app, you can load a video on
your calculator and play it!

## How to get videos

You can't use traditional video files. Instead, you need to convert your video
to a sequence of images. An already converted video is called a available
[there](https://yaya-cout.github.io/Nwagyu/assets/video.bin).

To convert a video, you can use the `ffmpeg` command line tool. Here is an
example command assuming that your video is called `input.mp4` in the current
directory:

```bash
ffmpeg -i input.mp4 \
  -vf scale=320:240,setsar=1:1,fps=15 \ # Resize video to 320x240@15fps
  -t 00:00:10 \ # Only keep the first ten second
  -vcodec mjpeg \ # Use the MJPEG codec
  output.mjpeg
```

This command will convert your `input.mp4` file into a `output.mjpeg` one. Then you
can simply upload the `playa.nwa` along with the `output.mjpeg` video from NumWorks’
installer. See the [how to install](../help/how-to-install.md) guide for more
information.

## Download

You can download the Playa app from this link:

- [Playa](https://yaya-cout.github.io/Nwagyu/assets/apps/playa.nwa)

## Installation

To install the Playa app, follow the instructions in the
[how to install](../help/how-to-install.md) guide.

## Source code

Source code for Playa is unfortunately missing, as it's creator
([ScarlettSpell](https://github.com/ScarlettSpell)) published it only in
compiled version.
