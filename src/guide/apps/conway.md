# Conway

Conway's Game of Life is a simulation game dating back to 1970.
After an initial placement of live cells on an infinite grid of otherwise
dead cells, the game plays itself, with rules defining which cells should
live, die or be born on the next iteration.
Some patterns have been found like the glider, which will move forever in
a diagonal path.

## Features

- Menu editor, where you can pause and edit the simulation at any moment.
- A persistent pattern copy system, allowing you to copy any nice cell structure
you may have created into the calculators memory, making it persistent even if
you close the app. You can then paste these patterns wherever you like on the grid.
- Can turn a black and white image into a pattern file (.cwp), using the python
script provided in the source code repo. The file can later be used as an external
data file (uncomment some lines doing that in the source code then recompile).

## Controls

Here are the controls for version 1.0.0:

Use OK to switch between pause (menu/edit mode) and running the simulation.

When in edit mode, use the arrows to control a pink cursor. Toolbox (to the left of backspace) and backspace can be used to draw / erase cells, in that order.

By pressing shift, you place your first point of a selection rectangle. When pressing shift a second time, the cells inside the shown rectangle will be locally copied in a file called "pattern.cwp" on your calculator. Use the Ans key to paste at your cursor. Pasting too close to the right edge wraps the pattern around, and too low only draws what it can. A prior issue where pasting too low could cause a reset should now be fixed.

Simulation speed can be changed with + and -.

!They do not represent the speed, but rather the time between each frame!

Increasing (pressing +) the time slows down the simulation (and pressing - speeds it up). Pressing the division key cycles between 3 color palettes for live cells:

White (0xFFFF) Green (0xBECA) Peach (0xFDCF)

(Green and Peach colors come from Gameboy palettes, or so it said where i found them)

An in-depth guide about the controls can be found on my repo with the source code, link below

## Download

You can download the Conway app from this link:

- [Conway v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/conway-1.0.0.nwa), First version

## Installation

To install the Conway app, follow the instructions in the
[how to install](../help/how-to-install.md) guide.

If you wish to embed a pattern (.cwp file on the calculator, src/input.txt when compiling), edit the source code to compile using external_data

## Source code

The source code is available [here](https://github.com/MartiPuigV/Conway-NWA)
