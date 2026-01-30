# Conway

Conway's Game of Life is a simulation game dating back to 1970.
After an initial placement of live cells on an infinite grid of otherwise
dead cells, the game plays itself, with rules defining which cells should
live, die or be born on the next iteration.
Some patterns have been found like the [glider](https://conwaylife.com/wiki/Glider),
which will move forever in a diagonal path.

## Features

- Editor menu, where you can pause and edit the simulation at any moment.
- A persistent pattern copy system, allowing you to copy any cell structure
you may have created into the calculators memory, making it persistent even if
you close the app. You can then paste these patterns wherever you like on the grid.
- Can turn a black and white image into a pattern file (`.cwp`), using the python
script provided in the source code repo. The file can later be used as an external
data file (uncomment some lines doing that in the source code then recompile).
- 3 different color palettes to choose from
- A settings file to save your preferences
- Customizable settings, such as frame time, simulation scale and more.

## Controls

- `OK`: switch between pause (menu/edit mode) and running the simulation.
When in edit mode, use the arrows to control a pink cursor.

- `Toolbox`: Draw cell under cursor if in edit mode.

- `Backspace`: Erase cell under cursor if in edit mode.
  (located to the right of toolbox, below OK and Return)

- `Shift`: places your first point of a selection rectangle. When
pressing shift a second time, the cells inside the shown rectangle will be
locally copied in a file called "pattern.cwp" on your calculator.

- `Ans`: Paste copied pattern at your cursor position.

- `+` & `-`: Change simulation speed.

! They do not represent the speed, but rather the time between each frame !

- `÷`: Toggles strict/transparent pasting. Transparent pasting only pastes
live cells, while strict will overwrite the entire selection rectangle with what the
pattern contains, even writing dead cells to the grid.

- `Alpha`: Cycles between the 3 color palettes

White
Green
Peach / Beige

Green and Peach colors come from [here](https://www.deviantart.com/advancedfan2020/art/Game-Boy-Palette-Set-Color-HEX-Part-12-920496174)

- `x` (multiplication): Copies the entire screen as a pattern

- `(` & `)`: Cycle through 4 different scales. Changes only apply when loading settings
at app start. Don't forget to save config with `EXE` (see below)

- `EXE`: Save current config (Color palette, grid scale, simulation speed)
The configurations should automatically load when the app launches.

An updated guide about the controls can be found on my repo with the source code, link below. This one might be outdated.

## Download

You can download the Conway app from this link:

- [Conway v1.1.0](https://yaya-cout.github.io/Nwagyu/assets/apps/conway-1.1.0.nwa), Rework of all aspects, bug fixes. UX and UI.
- [Conway v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/conway-1.0.0.nwa), First version

## Installation

To install the Conway app, follow the instructions in the
[how to install](../help/how-to-install.md) guide.

If you wish to embed a pattern (`.cwp` file on the calculator, `src/input.txt` when compiling), edit the source code to compile using external_data
A `.nwa` file accepting external_data might be available on my repo.

## Source code

The source code is available [here](https://github.com/MartiPuigV/Conway-NWA)
