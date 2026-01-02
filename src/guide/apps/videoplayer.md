# Video Player

This app is a video player for NumWorks calculators. It allows you to play any videos
that have been converted to a compatible format.

## Download

Official releases are available on [GitHub Releases](https://github.com/SaltyMold/Video-Player-for-Numworks/releases).

If you prefer, you can use this direct link:

- [VideoPlayer 1.1.1](https://yaya-cout.github.io/Nwagyu/assets/apps/videoplayer-1.1.1.nwa)

## How to get videos

You can take sample video from [samples folder](https://github.com/SaltyMold/Video-Player-for-Numworks/tree/main/samples)
on the github repository.
Or convert your own videos following the instructions below.

To convert a video, you can use the `ffmpeg` command line tool. Here is an
example command assuming that your video is called `input.mp4` in the current
directory:

Keep the resolution at 320×240. Adjust `-q:v`, `fps=` and `-t` for quality, fps
and duration.

With cropping:

```bash
ffmpeg -i input.mp4 \
  -vf "scale=320:240:force_original_aspect_ratio=increase,crop=320:240,setsar=1:1,fps=15" \ # Cropping to 320x240
  -t 00:00:30 \ # Limit to 30 seconds
  -vcodec mjpeg \ # Use the MJPEG codec
  -q:v 24 -an \ # Quality and no audio
  output.mjpeg
```

Without cropping:

```bash
ffmpeg -i input.mp4 \
  -vf "scale=320:240:force_original_aspect_ratio=increase,setsar=1:1,fps=15" \ # Scaling to 320x240
  -t 00:00:30 \ # Limit to 30 seconds
  -vcodec mjpeg \ # Use the MJPEG codec
  -q:v 24 -an \ # Quality and no audio
  output.mjpeg
```

This command will convert your `input.mp4` file into a `output.mjpeg` one.

A video at 320x240 15fps t30 q24 is around 1.2MB.

## How to use the app

| Key   | Action        |
|-------|---------------|
| Back  | Quit app      |
| Shift | Change FPS    |
| EXE   | Debug mode    |

If you change fps, they are saved in the calculator storage for next time.

It runs around ~35 fps on n0120, and around ~15 fps on n0110 and n0115

## Installation

To install the Video Player app, follow the instructions in the
[how to install](../help/how-to-install.md) guide to install it along with the
`mjpeg` file.

## Why not use Playa ?

- Playa is not open source while VideoPlayer is.
- Playa bin weigh 249KB while VideoPlayer weighs only 27KB.
- VideoPlayer offers more features like changing target fps on the fly to match
  with the converted video, and a debug mode to check performance. Preferences
  are saved on the calculator storage.
- The video conversion for VideoPlayer is more flexible since you can choose
  target fps on the calculator, so the video is not sped up to the calculator
  limit. And thus it leaves storage to change other parameters.

## Source code

Source code for VideoPlayer is available
[here](https://github.com/SaltyMold/Video-Player-for-Numworks/).
