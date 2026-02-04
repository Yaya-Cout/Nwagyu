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
- Can turn a black and white image into a usable pattern. See below for instructions!
- 3 different color palettes to choose from
- A settings file to save your preferences
- Customizable settings, such as frame time, simulation scale and more.

## Controls

|**Key**     |**Action**                                                   |
| ---------- | ----------------------------------------------------------- |
|`OK`        | Switch between pause (edit mode) and running the simulation |
|`Arrows`    | Move the cursor around (in edit mode)                       |
|`Toolbox`   | Draw cell under cursor (in edit mode)                       |
|`Backspace` | Erase cell under cursor (in edit mode)                      |
|`Shift`     | Select area to copy (can later be pasted)                   |
|`Ans`       | Paste copied pattern at your cursor position                |
|`+` & `-`   | Increase/decrease frame duration                            |
|`÷`         | Toggles strict/transparent pasting (details below)          |
|`Alpha`     | Cycles between the 3 color palettes (see below)             |
|`×`         | Copies the entire screen as a pattern                       |
|`(` & `)`   | Cycle through 4 different resolutions (see below)           |
|`EXE`       | Save current configuration (palette, frame time, ...)       |

An updated guide about the controls can be found on my repo with the source code, link [below](#source-code). This one might be outdated.

## Details

### Strict vs. Transparent pasting

- Strict pasting will paste anything the original pattern contains, including dead cells. This might overwrite
live cells with dead ones.
- Transparent pasting, as its name suggest, acts as a transparent "image", and will
only paste live cells. In transparent mode, selecting too large an area with too many dead cells is not a
problem, as pasting will not overwrite a large rectangle with dead cells.

### Color palettes

- White
- Green
- Peach / Beige

Green and Peach colors come from [here](https://www.deviantart.com/advancedfan2020/art/Game-Boy-Palette-Set-Color-HEX-Part-12-920496174)

### Resolution

IMPORTANT:: For resolution changes to apply, you must change resolution, save configuration changes with `EXE`, then quit
and open the app again. The grid is created when the app opens, and needs to be reopened each time you want to change the
resolution. Future updates might circumvent this flaw.

Changes how many pixels wide a cell is. The available resolutions as of 1.1.0 are 2, 4, 5 and 8 pixel wide squares for a cell.
A 1:1 pixel:cell ratio was doable in older versions, but newer versions fall short of RAM for that luxury. Don't worry about
over- or undershooting those values, as it will simply wrap around.

## Download

You can download the Conway app from this link:

- [Conway v1.1.0](https://yaya-cout.github.io/Nwagyu/assets/apps/conway-1.1.0.nwa), Rework of all aspects, bug fixes. UX and UI.
- [Conway v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/conway-1.0.0.nwa), First version

## Installation

To install the Conway app, follow the instructions in the
[how to install](../help/how-to-install.md) guide.

## Embedding your image as a pattern

Use the python script provided on my source repo (see below) and turn your image into a `.cwp` file (should be straightforward).
Download the `.nwa` marked as accepting `external_data`, and add the `.cwp` file as the input file to the `.nwa` when following
the above installation guide.

## Source code

The source code is available [here](https://github.com/MartiPuigV/Conway-NWA)
