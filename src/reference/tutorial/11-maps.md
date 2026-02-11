# Part 11: Map support

A small addition to the basic snake game done by some implementations are maps:
you can have obstacles on the map border and in the middle of the screen.

In our case, I will implement custom map support. The implementation will
contains several parts

- Raw text files representing maps
- External file loading in our app
- Parsing our text files in the app to check the map file validity
- Drawing the map on the screen
- Handling map collisions

## Creating map files

Maps file need to exactly match our screen size. To do so, we will use the
`SNAKE_MAX_X_COORDINATE` and `SNAKE_MAX_Y_COORDINATE` values. The easiest way is
to compute them by hand

| Side | Computation     | Value |
| ---- | --------------- | ----- |
| X    | `320÷10−1`      | 31    |
| Y    | `(240−18)÷10−1` | 21    |

These values are starting at 0, so we need to add one to the size we are going
to use for our map.

Create a new folder `maps` in your `src` folder and create a new raw text file
named `base.txt`. 

::: warning

On Windows, be sure to save the file with UNIX newlines, this
will be important for the way we will parse the file. Newlines are the `\n` char
on real operating systems, but Microsoft is using `\r\n`, which will confuse our
basic parser.

:::

In this file, fill a line of 32 `0`, then copy the line 22 times. You should now
have a 32×22 `0` grid.

Replace the `0` in the grid by `1` where you will want to have walls on your
map.

::: tip
You can use the Insert key on your keyboard to switch to overwrite mode if your
text editor support this feature (most old editors support it, but recent ones
tend to discontinue it as "legacy"). It will allow you to replace chars just by
using keyboard keys without removing previous chars.

On VSCode, if you press Ctrl + Shift + Up/Down arrow you can add multiple
cursors at the same time, which allows creating vertical lines.
:::

Some map examples (click to unfold):

::: details edges.txt

```raw
11111111111111111111111111111111
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
10000000000000000000000000000001
11111111111111111111111111111111
```

:::

::: details teleport.txt

```raw
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
11111111111111111111111111111111
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
00000000000000010000000000000000
```

:::

There are just a few examples of what's possible to do. Feel free to experiment
and create your own maps.

## External file loading and parsing

Now that we have maps, we need to use them. To simplify the code, we will
validate the file at app startup to assume it's safe later during game
execution.

Maps will be stored as external files, just like games on emulators.

NumWorks actually did a good job at implementing external files: you need to
access them using `eadk_external_data`, and the file selector on the website is
automatically enabled if you are using it.

For the CLI (command line interface) installation, you need to add a flag to add
a file.

In the `Makefile`, add the following line:

```makefile
MAP_FILE = src/maps/teleport.txt
```

And edit the build target to use the map file:

```makefile
.PHONY: run
run: $(BUILD_DIR)/app.nwa $(MAP_FILE)
    @echo "INSTALL $<"
    $(Q) $(NWLINK) install-nwa --external-data $(MAP_FILE) $<

$(BUILD_DIR)/%.bin: $(BUILD_DIR)/%.nwa $(MAP_FILE)
    @echo "BIN     $@"
    $(Q) $(NWLINK) nwa-bin --external-data $(MAP_FILE) $< $@

$(BUILD_DIR)/%.elf: $(BUILD_DIR)/%.nwa $(MAP_FILE)
    @echo "ELF     $@"
    $(Q) $(NWLINK) nwa-elf --external-data $(MAP_FILE) $< $@
```

This means we don't have to worry about enabling the file selector anymore.

For the actual parsing code, we want to do quite a lot of checks:

- Exactly `SNAKE_MAX_X_COORDINATE + 1` bytes in each line (last char is the
  newline, `\n`)
- Exactly `SNAKE_MAX_Y_COORDINATE` lines if the last line contained data, or
  `SNAKE_MAX_Y_COORDINATE + 1` lines to allow a trailing newline (technically,
  we only care about the case where lines are missing, but checking for too many
  lines can help map creation)
- In each data line, only the `0` and `1` chars are allowed
- If `\n` is encountered, it means we have a newline

We also want some error handling to help map debugging:

- In case the file use Windows file format, there will be some `\r` in the data,
  so we use a specific error for this case
- In case an invalid char is encountered, we print an error containing the
  invalid char and its location
- In case the line length is invalid, we show an error too
- In case the line count is invalid, print an error

If an error is encountered, we save disable map handling.

The code scan the file char by char using a pointer, and use a check to prevent
getting out of bounds.

Also worth noting error handling is done using `sprintf` to generate a string
passed to `error` (which in turn call `eadk_display_draw_string`)

The final code is the following, in a new file called `map.c`:

```c
#include <stdint.h>
#include <stdbool.h>
#include <stdio.h>
#include <eadk.h>

#include "map.h"
#include "main.h"

bool is_map_file_valid() {
    const char * index = eadk_external_data;
    const char * end_address = eadk_external_data + eadk_external_data_size;

    uint32_t current_line = 0;

    uint32_t line_index = 0;
    while (index < end_address) {
        while (index < end_address) {
            if (*index == '\n') {
                break;
            }

            if (*index == '\r') {
                char buffer[100];
                sprintf(buffer, "Error in map at line %lu:%lu: Windows-style newline", current_line + 1, line_index + 1);
                error(buffer);

                return false;
            }

            if (*index != '0' && *index != '1') {
                char buffer[100];
                sprintf(buffer, "Error in map at line %lu:%lu: Invalid char '%c'", current_line + 1, line_index + 1, *index);
                error(buffer);

                return false;
            }
            line_index += 1;
            index += 1;
        }

        if (line_index != (SNAKE_MAX_X_COORDINATE + 1)) {
            char buffer[100];
            sprintf(buffer, "Error in map at line %lu: Invalid length", current_line + 1);
            error(buffer);
            return false;
        }

        index += 1;
        current_line += 1;

        line_index = 0;
    }

    if (current_line == SNAKE_MAX_Y_COORDINATE && line_index == SNAKE_MAX_X_COORDINATE + 1) {
        return true;
    }

    if (current_line == SNAKE_MAX_Y_COORDINATE + 1 && line_index == 0) {
        return true;
    }
    char buffer[100];
    sprintf(buffer, "Error in map: invalid line count (got %lu, %i expected)", current_line, SNAKE_MAX_Y_COORDINATE);

    error(buffer);

    return false;
}
```

At the same time, we need to add this new file to the Makefile:

```makefile

src = $(addprefix src/,\
  main.c \
  snake.c \
  fruits.c \
  score.c \
  storage.c \
  map.c \
)
```

One useful change for debugging is switching to the small font in `error` as
error can be long.

However, as game over use `error`, we will define a new `game_over` function
specifically for handling game over.

The result is the following in `main.c`:

```c

void error(char * message) {
  eadk_display_push_rect_uniform((eadk_rect_t){0, 0, 320, EADK_SCREEN_HEIGHT - 18}, eadk_color_red);
  eadk_display_draw_string(message, (eadk_point_t){0, 0}, false, eadk_color_black, eadk_color_white);
  eadk_timing_msleep(5000);
}

void game_over() {
  eadk_display_push_rect_uniform((eadk_rect_t){0, 0, 320, EADK_SCREEN_HEIGHT - 18}, eadk_color_red);
  eadk_display_draw_string("Game over", (eadk_point_t){0, 0}, true, eadk_color_black, eadk_color_white);
  eadk_timing_msleep(5000);
}
```

And the game over check can be replaced to use the new function:

```c
if (check_snake_collision(snake_location, false)) {
    game_over();
    return 0;
}
```

## Drawing the map

We can know weather our map file is safe, but there's no point in doing so if we
don't use it.

To draw our map, we will first create a new function to get data in map at
specific coordinates, then the real drawing function.

As our text file only have one byte per char, we can access it just like a C
array. To access data on the first line, using directly the `x` value as index
work. To access data on the first column, we need to multiply the `y` value by
`SNAKE_MAX_X_COORDINATE + 2`. This `+ 2` come from two different things:

First, to access the next line, we need to multiply by line size + 1. Here's an
example

```raw
0123456789
abcdefghij
```

The `a` is the 11-th value in the text, and the line size is 10. To access the
`0` located at index 0, we do `0 × 11`. To access the `a` located index 11, we
do `1 × 11`. This offset explains the first `+ 1`

The second `+ 1` has the same origin as the `+ 1` in the previous section: `\n`
is a char in each line, which we need to skip.

The rest of the parsing is just comparing the value found in the file to `0` and
`1` to return an int, and log an error if the value is invalid (which shouldn't
happen if the file is valid, and this function shouldn't be called in case the
file is invalid). The only case where the data could be invalid is if there's an
error in the Snake code, which we would want to fix anyway.

The function is the following, which should now be quite straightforward:

```c
uint8_t map_value_at_index(uint32_t x, uint32_t y) {
    char text_value = eadk_external_data[(y * (SNAKE_MAX_X_COORDINATE + 2)) + x];

    switch (text_value) {
        case '0':
            return 0;
            break;
        case '1':
            return 1;
            break;
        default:
            char buffer[100];
            sprintf(buffer, "Invalid map value at coordinates (%lu;%lu): %c", x, y, text_value);
            error(buffer);
            return 0;
            break;
    }
}
```

To draw the map, we are just iterating on the x and y coordinates. If you only
know Python, this syntax may be quite surprising compared to
`for x in range(10):`. Otherwise, some languages such as JavaScript have syntax
inspired by C.

It works in 3 parts:

```c
for (initial code; condition to reenter the loop; code to be executed at each iteration) {}
```

The initial code is where you initialize your variable with it's type (`x` for
example). The condition is simply a condition like a while loop. The third
expression is where you increment your variable.

Note that in C (and in JavaScript which copied the syntax), instead of writing
`i = i + 1` or `i += 1`, you can shorten the code even more by using `i++`.

This being said, you should now be able to understand (and hopefully write) C
for loops.

When iterating on the coordinates, we just need to check if the value is `1`
(obstacle) and draw a wall at this place.

I also added a line at the bottom to add a better separation between the game
area and the score.

The code is quite simple:

```c
void draw_map() {
    for (int x = 0; x <= SNAKE_MAX_X_COORDINATE; x++) {
        for (int y = 0; y <= SNAKE_MAX_Y_COORDINATE; y++) {
            char value = map_value_at_index(x, y);

            if (value == 1) {
                eadk_display_push_rect_uniform((eadk_rect_t){x * SNAKE_SIZE, y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE}, SNAKE_MAP_COLOR);
            }
        }
    }

    eadk_display_push_rect_uniform((eadk_rect_t){0, (SNAKE_MAX_Y_COORDINATE + 1) * SNAKE_SIZE, (SNAKE_MAX_X_COORDINATE + 1) * SNAKE_SIZE, 2}, SNAKE_MAP_COLOR);
}
```

We can edit the `SNAKE_MAX_Y_COORDINATE` definition in `main.h` to ensure our 2
new pixels are always going to be available, for any `SNAKE_SIZE` value:

```c
#define SNAKE_MAX_Y_COORDINATE (EADK_SCREEN_HEIGHT - 20) / SNAKE_SIZE - 1
```

We also need to create a constant containing our wall color as grey isn't
available as an EADK const. In case you want to know, the available colors are:

- black
- white
- red
- green
- blue

If you want any other color, you will have to create it by yourself. The
NumWorks uses RGB565 color encoding, which is the standard for 16 bits color
screens. To select colors in this format, you can convert by yourself, or use
this [color picker](https://rgbcolorpicker.com/565) works great (copy the value
starting with `0x`).

Anyway, we just need to add our grey color, so let's create `map.h` with the
following content:

```c
#ifndef MAP_H
#define MAP_H

#define SNAKE_MAP_COLOR 0x8410

#endif
```

The final part is calling our functions. To stay consistent with other files, I
created a function named `init_map` in `map.c` which checks the map file syntax
and draw it.

```c
static bool is_map_valid = false;

void init_map() {
    if (is_map_file_valid()) {
        is_map_valid = true;
        draw_map();
    }
}
```

Note that we are saving weather the map is valid as a global variable to avoid
checking the file multiple time during execution.

We can declare it in our header file:

```c
void init_map();
```

In `main.c`, we can finally use it.

Header include:

```c
#include "map.h"
```

Initialization:

```c
int main(int argc, char * argv[]) {
  eadk_display_push_rect_uniform(eadk_screen_rect, eadk_color_black);
  init_map();
  init_snake((snake_element_t){0, 0});
  init_fruits();
```

The map will need to be loaded before fruits (to prevent fruits to spawn on the
map).

## Checking for collisions

For the third time in this tutorial, we need to check for collision (we did it
against the snake itself, and fruits), so I'm going over it faster.

In `map.c`, we just check if the file is valid (to avoid the caller to worry
about the map itself) and if there's a wall at our current location.

```c
#include "snake.h"

bool check_map_collision(snake_element_t snake_location) {
    if (is_map_valid) {
        return map_value_at_index(snake_location.x, snake_location.y) == 1;
    }
    return false;
}
```

In `map.h`; we declare the prototype:

```c
#include "snake.h"

bool check_map_collision(snake_element_t snake_location);
```

In our main loop (in `main.c`), we add the new wall collision checking, which is
quite similar to our current game over check:

```c
if (check_map_collision(snake_location)) {
    game_over();
    return 0;
}
```

The last bit is prevent fruits from spawning on the map, in `add_fruit`
(`fruits.c`):

```c
if (check_snake_collision((snake_element_t){x, y}, true)) {
    continue;
}

if (check_map_collision((snake_element_t){x, y})) {
    continue;
}
```

Our map support is now working! :tada:

## Disabling map support in Makefile

You may want to fully disable external data support for users who don't want to
use maps.

In our current architecture, you could define a new variable
containing the map as a string, replace all references to `eadk_external_data`
with this new variable, and replace `eadk_external_data_size` by the size of
your string to bundle a map.

What I'm going to do is much more drastic: create a secondary `map.c` file
called `map.dummy.c` which just contains the necessary function definitions for
the code to build and run correctly without the actual implementation:

```c
#include <eadk.h>
#include <stdbool.h>
#include "map.h"
#include "main.h"
#include "snake.h"

void init_map() {
    eadk_display_push_rect_uniform((eadk_rect_t){0, (SNAKE_MAX_Y_COORDINATE + 1) * SNAKE_SIZE, (SNAKE_MAX_X_COORDINATE + 1) * SNAKE_SIZE, 2}, SNAKE_MAP_COLOR);
}

bool check_map_collision(snake_element_t snake_location) {
    return false;
}
```

The rest of the magic happens in the Makefile:

We first define a variable, which can be overwritten on the CLI:

```makefile
USE_MAP = 1
```

We then remove `map.c` from the main `src` adding, and choose the right version
of it conditionally.

```makefile
src = $(addprefix src/,\
  main.c \
  snake.c \
  fruits.c \
  score.c \
  storage.c \
)

ifeq ($(USE_MAP),1)
src += $(addprefix src/,\
  map.c \
)
else
src += $(addprefix src/,\
  map.dummy.c \
)
endif
```

To enable/disable the map, simply build with

```bash
make run USE_MAP=1
```

or

```bash
make run USE_MAP=0
```

You may need to run `make clean` to force `make` to regenerate the NWA file.

And we are done with maps! :tada:

As an exercise, you can try loading the maps from the RAM storage using
[storage.c](../apps/storage.md) and add a map selector at startup instead of
using external files. You can go further by creating a map editor

I know I'm repeating myself, but don't forget to commit your work!
