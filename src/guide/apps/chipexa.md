# Chipexa

Chipexa is a CHIP-8 hex editor and emulator for NumWorks: write CHIP-8
programs opcode by opcode directly on your calculator, then run them instantly.
This app is made for *writing* CHIP-8 programs on the go — no computer needed.

## Features

- Hex editor with one cell per 16-bit opcode, addresses shown from `0x200`,
  and opcodes color-coded by instruction family
- Built-in CHIP-8 emulator (64x32 display, classic 16-key pad)
- Save and load programs as `.ch8` files (up to 3584 bytes) in the calculator
  storage
- Optional visual line breaks to group your code, saved in a `.lay` sidecar file

## Usage

Type opcodes digit by digit; a cell turns colored once its 4 digits are
entered, and a new empty cell is appended automatically. Press `EXE` to run
the program, `Back` to return to the editor.

## Controls

### Editor

| Key                           | Action                                      |
| ----------------------------- | ------------------------------------------- |
| 0-9                           | Type hex digits 0-9                         |
| Second keyboard row           | Type hex digits A-F                         |
| Arrow keys                    | Move the cursor                             |
| EXE / OK                      | Run the program                             |
| Backspace                     | Erase the last digit of the current cell    |
| +                             | Insert an empty cell before the cursor      |
| -                             | Delete the current cell                     |
| Ans                           | Cycle a visual line break before the cell   |
| Toolbox                       | Save (type a name with the alpha letters)   |
| Var                           | Load / delete `.ch8` files                  |
| Back                          | Quit the app                                |

### Emulator

The CHIP-8 16-key pad is mapped as follows: `0`-`9` on the digit keys, and
`A`-`F` on the second keyboard row.

| Key     | Action               |
| ------- | -------------------- |
| Back    | Return to the editor |

## Download

You can download the Chipexa app from this link:

- [Chipexa v1.0.0](/assets/apps/chipexa-1.0.0.nwa), First release

## Installation

To install the app, follow the instructions in the
[how to install](../help/how-to-install.md) guide.

## Source code

The source code is available [here](https://github.com/ScratchY98/CHIP-8-HEXA-Numworks).
