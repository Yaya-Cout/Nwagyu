# Part 3: Moving the snake

We now have a clean app to work with, so let's start interesting work.

## Snake design

A snake element will be composed of 10×10 pixels. It will start at a size of 5
elements, which will be stored in a list.

## Initializing the screen

The first thing to do when starting an app is to clear the screen, otherwise you
will be drawing on the home screen. The classic way to do so is to fill a
rectangle of the size of the screen (320×240 pixels). This command will create a
black background on the whole screen, so put it at the top of the `main()` function.

```c
eadk_display_push_rect_uniform(eadk_screen_rect, eadk_color_black);
```

## Moving the snake on the screen

To start, we will move on square on a screen, which is going to be the snake.
The snake size will be added later.

### Variable creations

We first need to save the current snake location so let's create variables (in
the `main` function):

```c
int x = 0;
int y = 0;
```

We also need to save the snake direction. To simplify the code we will use
constants (in C++ or in Rust an enum would be more adapted, but C doesn't have
such structures). To have a more clear code let's create an header file, as we
will likely need these values in other files.

Create `main.h` with the following content:

```c
#define SNAKE_DIRECTION_UP    0
#define SNAKE_DIRECTION_RIGHT 1
#define SNAKE_DIRECTION_DOWN  2
#define SNAKE_DIRECTION_LEFT  3
```

At the top of `main.c`, we include this file to use the constants we just
defined:

```c
#include <eadk.h>
#include "main.h"
```

And now, we can create the direction in the `main` function:

```c
int direction = SNAKE_DIRECTION_RIGHT;
```

### Moving snake straight

A moving snake is more interesting, so let's add code for handling snake motion.

We will handle each direction separately, using the `switch` C syntax, which
allows checking for lots of different cases efficiently. We are going to update
the current coordinates and save the old ones in another variable. The old
variables will be replaced with a list when the snake will have a size.

The first step is to create an infinite loop. Unfortunately, the template use an
old C version without built-in booleans so you need to include `stdbool.h` at
the top of the file (or use `while (1)` instead).

```c
#include <eadk.h>
#include <stdbool.h>
#include "main.h"
```

Now, let's add our main loop to the `main` function:

```c
while (true) {
    int old_x = x;
    int old_y = y;
    switch (direction) {
      case SNAKE_DIRECTION_UP:
        y -= 1;
      case SNAKE_DIRECTION_RIGHT:
        x += 1;
      case SNAKE_DIRECTION_DOWN:
        y += 1;
      case SNAKE_DIRECTION_LEFT:
        x -= 1;
      default:
        error("Invalid direction");
        return 0;
    }
}
```

If you look at this code, you may notice I've added an `error` function: the
`direction` shouldn't be invalid, but in case it does, our code won't be
intended for it so I prefer to handle this case. It can be helpful in case you
get memory corruption too.

Here's the code of my `error` function, which just displays a text on a red
background:

```c
void error(char * message) {
  eadk_display_push_rect_uniform(eadk_screen_rect, eadk_color_red);
  eadk_display_draw_string(message, (eadk_point_t){0, 0}, true, eadk_color_black, eadk_color_white);
  eadk_timing_msleep(5000);
}
```

The snake is now moving, but we actually need to display it to be sure it works.

### Displaying the snake

Displaying the snake is quite simple: as the snake is currently a square, we
only need to move one element, which means drawing the new location then
removing the old one.

Let's start by defining the snake size in the `main.h` file:

```c
#define SNAKE_SIZE 10
```

For the display itself, we will use `eadk_display_push_rect_uniform`. It takes
as argument an `eadk_rect_t` and an `eadk_color_t`. The color is just a renamed
`uint16_t` value, so any 16 bit color (RGB565) will work, but I prefer using the
constants for clarity.

```c
eadk_display_push_rect_uniform((eadk_rect_t){x * SNAKE_SIZE, y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE}, eadk_color_white);
eadk_display_push_rect_uniform((eadk_rect_t){old_x * SNAKE_SIZE, old_y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE}, eadk_color_black);
```

You can see I'm using a cast for initializing the `eadk_rect_t`, I don't know if
there's a better syntax for it in C, but this one is working and is efficient so
I just use it.

An `eadk_rect_t` has 4 fields: x index, y index, width, height. Their order is
similar to the Python `fill_rect` function.

Our "snake" is now moving, but if you run the app, you will notice a small bug:
it's moving really fast, at the point where you can't know where it is.

A simple fix is to add a call to `eadk_timing_msleep` to wait. Let's consider
100 ms of sleep time to begin with. We will optimize it for constant frame
duration later using the clock. One could decide to later change the frame
duration to change difficulty, for example over time played

We will simply add this function at the end of the loop

```c
eadk_timing_msleep(100);
```

If you execute the app right now, you will now see the snake moving on the
screen (and wrapping around), which is way better.

An useful feature could be to actually change the snake direction (I'm not a
professional snake dev, but I think users will prefer if they can control the
snake :)

## Handling key press

To use the keyboard efficiently, you need two steps:

1. Scanning the keyboard to know which keys are pressed
2. Check if the key was pressed on the keyboard scan

Internally, the state is just a bit field containing the state

Let's implement, the code is mostly straightforward with these explanations:

```c
eadk_keyboard_state_t keyboard = eadk_keyboard_scan();

if (eadk_keyboard_key_down(keyboard, eadk_key_up) && direction != SNAKE_DIRECTION_DOWN) {
    direction = SNAKE_DIRECTION_UP;
}
if (eadk_keyboard_key_down(keyboard, eadk_key_right) && direction != SNAKE_DIRECTION_LEFT) {
    direction = SNAKE_DIRECTION_RIGHT;
}
if (eadk_keyboard_key_down(keyboard, eadk_key_down) && direction != SNAKE_DIRECTION_UP) {
    direction = SNAKE_DIRECTION_DOWN;
}
if (eadk_keyboard_key_down(keyboard, eadk_key_left) && direction != SNAKE_DIRECTION_RIGHT) {
    direction = SNAKE_DIRECTION_LEFT;
}
```

Notice how we check for the current direction to prevent the user doing an
U-turn (which makes no sense in a snake)

We can also allow the user to exit the app (the automatic OnOff and Home keys
handling is quite slow sometimes):

```c
if (eadk_keyboard_key_down(keyboard, eadk_key_back) || eadk_keyboard_key_down(keyboard, eadk_key_home) || eadk_keyboard_key_down(keyboard, eadk_key_on_off)) {
    return 0;
}
```

Some features are still missing from the snake at that point:

- Being composed of multiple elements
- Game over
- Eating fruits
- Best score saving
- Obstacles/world-wrap

In the next part, we will replace the coordinates system with a list
containing the coordinates of each element of the snake.
