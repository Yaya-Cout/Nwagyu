# Peanut GB

Peanut GB is a Gameboy emulator. Do you want to play your original Game Boy
cartridge on your NumWorks calculator? This is the app for you!

## How to get games

We can't provide you any games, because of legal reasons. However, you can
download games from the internet easily. A search like "gameboy roms" should
give you plenty of results.

You will need to add your rom as an external file. To do so, follow the
instructions in the [how to install](../help/how-to-install.md) guide.

## How to play

It’s quite obvious, given how the NumWorks’ keypad looks just like a Game Boy’s.
Anyway, here’s a list of the bindings between the NumWorks’ keypad and the
Game Boy’s:

| Game Boy                      | NumWorks                               |
| ----------------------------- | -------------------------------------- |
| Arrow keys                    | Arrow keys                             |
| A                             | Back                                   |
| B                             | OK                                     |
| Select                        | Shift                                  |
| Select (Alternate, see below) | Home                                   |
| Start                         | Backspace                              |
| Start (Alternate)             | Alpha                                  |
| Start (Alternate, see below)  | On/Off                                 |

To modify the behavior of the emulator, you can use theses keys:

| Key     | Action                                                  |
| ------- | ------------------------------------------------------- |
| 1       | Use the original game boy palette                       |
| 2       | Use a pure greyscale palette                            |
| 3       | Use an inverted greyscale palette                       |
| 3       | Use Peanut-GB original palette                          |
| +       | Render the screen in fullscreen                         |
| -       | Render the screen with the original aspect ratio        |
| 7       | Show frame timings                                      |
| 9       | Enable On/Off and Home keys, and suspend the calculator |
| Toolbox | Write current save to storage                           |
| 0       | Write current save to storage and exit                  |

## Download

You can download the Peanut-GB app from this link:

Peanut-GB:

- [Peanut-GB v1.2.2](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgb-1.2.2.nwa), potential memory fix during save writing
- [Peanut-GB v1.2.1](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgb-1.2.1.nwa), memory fix during save writing
- [Peanut-GB v1.2.0](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgb-1.2.0.nwa), performance improvements, frame limiter, On/Off and Home keys
- [Peanut-GB v1.1.0](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgb-1.1.0.nwa), save support, fullscreen with ratio, new palettes, alpha key to start
- [Peanut-GB v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgb-1.0.0.nwa)

Peanut-GBC is a Peanut-GB version with color support for Gameboy Color games.
For traditional Gameboy games, prefer Peanut-GB which is optimized and faster.

- [Peanut-GBC v1.1.1](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgbc-1.1.1.nwa), equivalent to Peanut-GB v1.2.2
- [Peanut-GBC v1.1.0](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgbc-1.1.0.nwa), save support, equivalent to Peanut-GB v1.2.1
- [Peanut-GBC v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/peanutgbc-1.0.0.nwa)

::: warning
Peanut-GB (Color) require more RAM and use more CPU time, so some games won't
work at all or will not work in realtime (e.g. 1.5 second in the real world will
last 1 second in the game).
Most Gameboy Color games can run on normal Peanut-GB in greyscale for better
performance.
:::

## Installation

To install the Peanut-GB app, follow the instructions in the
[how to install](../help/how-to-install.md) guide.

## About On/Off and Home keys

External apps can't use On/Off and Home keys for control as the kernel detect if
these keys are pressed and react by exiting the app (and suspending the
calculator for the On/Off key).

As an user, the only thing you probably want to know is that you need to press
the "9" key on the keyboard enable the On/Off and Home keys. It will suspend the
calculator, so you just need to press On/Off after that to restore your game.
You need to do this every time you enter the emulator.

It also have the nice side effect of allowing suspending the calculator without
exiting the emulator which is useful in a lot of situations. For example, is
you need to temporary suspend the calculator in a hurry as the teacher is
coming, all you need to do is pressing the "9" key (but you are not playing
during class, right? _-insert Anakin and Padme meme here-_)

<!--
TODO: Create an English-only developer documentation for technical details
like storage and On/Off keys
-->

For the technical details on what exactly happen when you press the 9 key, see
below:

There is no API to disable explicitly this unwanted behavior. To work around
this issue, we call the kernel method for enabling USB which, among other
things, disable the interrupts and handling of On/Off and Home keys. It also
shut down the keyboard (except the back key), so we need to power it back on.
Hopefully, when the calculator goes out of sleep, keyboard is reinitialized, but
not interrupts.

This is a bit hacky, but at least it's working and better than nothing. An
official implementation from NumWorks would be useful, but who know if they are
planning to implement API for external apps… There is no official API for using
the storage, external apps are using an implementation directly reading the RAM
the same way as computer does to read and write files in the calculator, so we
are far away from getting a method to disable On/Off and Home.

A more complete explanation is available in the
[documentation](../../reference/apps/onoff-home.md).

## Source code

Source code for Peanut-GB v1.1.0 and later is available
[here](https://codeberg.org/Yaya-Cout/peanutgb).

Source code for Peanut-GB v1.0.0 is available
[here](https://github.com/nwagyu/peanutgb/).

Source code for Peanut-GBC v1.1.0 and later is available
[here](https://codeberg.org/Yaya-Cout/peanutgbc).

Source code for Peanut-GBC v1.0.0 is available
[here](https://github.com/Lisra-git/peanutgb/).
