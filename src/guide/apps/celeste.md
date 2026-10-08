# Celeste Classic
have you ever heard of Celeste, the famous platformer video game? A less-known
fact is that this game was first developed in 4 days for the PICO-8 virtual
console, before being renamed Celeste Classic.

What if you could play Celeste Classic on your calculator, for free? Thanks to
the port by [BenchatonDev](https://github.com/BenchatonDev), this is now
possible!

## Download

Official releases are available on [GitHub Releases](https://github.com/BenchatonDev/Celeste-Numworks/releases).

If you prefer, you can download Celeste from this link:

- [Celeste v1.5](https://github.com/BenchatonDev/Celeste-Numworks/releases/download/1.5/Celeste.nwa), improved saving (rollback, autosave, autoload), added settings and stats

::: details Old versions
- [Celeste v1.4](https://github.com/BenchatonDev/Celeste-Numworks/releases/download/1.4/Celeste.nwa), better memory usage, fix bugs
- [Celeste v1.3.1](https://github.com/BenchatonDev/Celeste-Numworks/releases/download/1.3.1/Celeste.nwa), new icon
- [Celeste v1.3](https://github.com/BenchatonDev/Celeste-Numworks/releases/download/1.3/Celeste.nwa), save support
- [Celeste v1.2](https://github.com/BenchatonDev/Celeste-Numworks/releases/download/1.2/Celeste.nwa), improved performance, frame limiter
- [Celeste v1.1](https://github.com/BenchatonDev/Celeste-Numworks/releases/download/1.1/Celeste.nwa), improved performance
- [Celeste v1.0](https://github.com/BenchatonDev/Celeste-Numworks/releases/download/1.0/Celeste.nwa)

:::

::: warning
Game saves between 1.3 and 1.4 are only compatible with these versions,
since 1.5, a new and improved save format was introduced, which is strictly
incompatible with older saves. Due to poor checks in the old savings system
any file named CelesteP8.sav that isn't in the format they expect will cause
a full calculator crash, this includes saves created by V1.5 and up.
:::

## How to play

The controls are quite simple to use in-game, with only the navigation buttons
being useful for the game itself:

| Action             | NumWorks         |
| ------------------ | ---------------- |
| Dash               | OK               |
| Jump               | Back             |
| Move around        | Arrows           |
| Pause              | Backspace        |
| Save state         | Shift            |
| Load state         | Alpha            |
| Load previous save | Ans              |
| Settings and stats | Toolbox          |
| Reset              | XNT (long press) |
| Exit               | Home             |

## Installation

To install the Celeste app, follow the instructions in the
[how to install](../help/how-to-install.md) guide.

## Source code

Source code for Celeste Classic for NumWorks is available
[here](https://github.com/BenchatonDev/Celeste-Numworks).
