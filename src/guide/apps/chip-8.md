# CHIP-8

CHIP-8 is a VM-like interpreted programming language, originally developped for the COSMAC VIP.
It supports many retro games, like some of the first PONG releases, as well as TRON
and more classics.

## Usage

To load a ROM, find your desired ROM by searching for it online, most of them should be free (public domain) and easy to find.
This repository [here](https://github.com/kripod/chip8-roms) contains many games. Make sure to download them as `.ch8`.

Use this unofficial (but very handy) [site](https://yaya-cout.github.io/Numworks-connector/#/) to load your ROMs
to your calculators filesystem. Ensure it ends in `.ch8` or it won't be recognized.
Having a long filename may be unreadable in the menu selection -- please keep it simple for your own sake.
Eg. `Tetris.ch8`

## Controls

Chip-8 uses a 4x4 keyboard, (left layout), and is mapped to
the layout on the right for the calculator:

    1 2 3 C         7 8 9 (
    4 5 6 D         4 5 6 x
    7 8 9 E         1 2 3 +
    A 0 B F         0 . E A     (NB: E and A are x10^ and Ans)

Each game has different binds, but uses only those keys!

For the emulator UI:

| **Key**           | **Action**                    |
| ----------------- | ----------------------------- |
| `OK`              | Opens ROM selection menu      |
| `Return`          | Reloads current ROM           |
| `Var`             | Toggles debugging text        |
| `Toolbox`         | Toggles pause                 |
| `Backspace`       | Step program (only in pause)  |

Debug and step is not really needed by the average user, but can be useful to debug your ROMs,
even though you probably don't want to use your calculator to debug them.

## Download

You can download the CHIP-8 app from this link:

- [CHIP-8 v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/chip-8-1.0.0.nwa), First release

## Installation

To install the CHIP-8 app, follow the instructions in the
[how to install](../help/how-to-install.md) guide.

## Source code

The source code is available [here](https://github.com/MartiPuigV/chip-8-NWA).
