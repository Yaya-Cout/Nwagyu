# Part 5: Eating fruits

A moving snake is interesting, but there is no point to playing snake if there
are no fruits!

Fruits will be also stored on a statically allocated list (they can be capped)
and each one will have to be checked against the snake head.

The structure will be similar to the snake file, so I will skip on some details
and just give the code.

## List initialization

In `fruits.h`, we add the maximum fruit count and struct:

```c
#include <stdint.h>

#define SNAKE_MAX_FRUITS 5

typedef struct {
  uint16_t x;
  uint16_t y;
} fruit_t;

void init_fruits();
```

In `fruits.c`, we define the list and its init code:

```c
#include "fruits.h"

static fruit_t FRUITS[SNAKE_MAX_FRUITS] = { 0 };

void init_fruits() {
    for (int i = 0; i < SNAKE_MAX_FRUITS ; i++) {
        FRUITS[i] = (fruit_t){UINT16_MAX, UINT16_MAX };
    }
}
```

And we can add the new file to the `Makefile`:

```makefile
src = $(addprefix src/,\
  main.c \
  snake.c \
  fruits.c \
)
```

Now call `init_fruits()` **after** `init_snake()` in `main()` (the order will be
important in the future).

```c
#include "fruits.h"

init_fruits();
```

## Adding fruits

We now need to actually spawn fruits on screen, so let's add a new function:
`add_fruit`.

The most important part is to generate random coordinates. In Python, you would
use randint:

```python
import random
x = random.randint(0, 320 / SNAKE_SIZE)
y = random.randint(0, 240 / SNAKE_SIZE)
```

In the NumWorks C API, there is no function such as `randint`. Instead, you have
`eadk_random()` which returns 32 bits of random data, which can be stored as a
float (to get a random floating-point number) or a an `int`/`uint` to get an
(signed or not) integer.

Once you have an integer, you can use a [modulo](https://en.wikipedia.org/wiki/Modulo)
(the rest of an euclidean division, or if you prefer, congruences) to cap its
value.

The Python code will translate this way in C:

```c
uint16_t x = eadk_random() % (320 / SNAKE_SIZE);
uint16_t y = eadk_random() % (240 / SNAKE_SIZE);
```

We will need the `320 / SNAKE_SIZE` later in our code when handling snake going
out of the screen, so I will suggest you to add it to `main.h` as a constant:

```c
#include "eadk.h"

#define SNAKE_SIZE 10
#define SNAKE_MAX_X_COORDINATE EADK_SCREEN_WIDTH / SNAKE_SIZE - 1
#define SNAKE_MAX_Y_COORDINATE EADK_SCREEN_HEIGHT / SNAKE_SIZE - 1

void error(char * message);
```

In `fruits.c`, we now need to include `main.h`:

```c
#include "main.h"
```

And simplify our code using the new constants:

```c
void add_fruit() {
    uint16_t x = eadk_random() % (320 / SNAKE_SIZE);
    uint16_t y = eadk_random() % (240 / SNAKE_SIZE);

    for (int i = 0; i < SNAKE_MAX_FRUITS ; i++) {
        if ((FRUITS[i].x == UINT16_MAX) && (FRUITS[i].y == UINT16_MAX)) {
            FRUITS[i] = (fruit_t){x, y };
            eadk_display_push_rect_uniform((eadk_rect_t){x * SNAKE_SIZE, y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE}, eadk_color_red);
            return;
        }
    }
}
```

You can add a call to `add_fruit()` at the end of `init_fruits()` to always
start the game with one fruit.

## Checking collisions

We have a snake, and we have fruits. How about making both interact?

The idea is to have the `main.c` asking `snake.c` about its location, then
asking `fruits.c` to know weather a fruit is present at this location. If a
fruit is present, `main.c` will increase the snake length and ask `fruits.c` to
remove the current fruit (and spawn a new fruit if no fruit is present anymore).

This will also allows `main.c` to keep track of the number of eaten fruits in
the future as a score.

Let's implement it:

In `snake.c`:

```c
void add_snake_element() {
    max_snake_size++;
}

snake_element_t get_snake_location() {
    return SNAKE[0];
}
```

In `snake.h`, we add the corresponding declaration:

```c
void add_snake_element();
snake_element_t get_snake_location();
```

In fruits, we start by adding some headers:

```c
#include <stdbool.h>
```

Then create a new function to automatically add a fruit if the list is empty:

```c
void add_fruit_if_empty() {
    for (int i = 0; i < SNAKE_MAX_FRUITS ; i++) {
        if ((FRUITS[i].x != UINT16_MAX) && (FRUITS[i].y != UINT16_MAX)) {
            return;
        }
    }
    add_fruit();
}
```

And finally the most useful function: collision checking

```c

bool check_fruit_collision(snake_element_t snake_location) {
    for (int i = 0; i < SNAKE_MAX_FRUITS ; i++) {
        if ((FRUITS[i].x == snake_location.x) && (FRUITS[i].y == snake_location.y)) {
            FRUITS[i] = (fruit_t){UINT16_MAX, UINT16_MAX};
            add_fruit_if_empty();

            return true;
        }
    }

    return false;
}
```

We need to add the declaration to the header file:

```c
#include "snake.h"
#include <stdbool.h>


bool check_fruit_collision(snake_element_t snake_location);
```

Unfortunately, we now get compilation errors about conflicting types. This is
due to the way I wrote the header files: currently, if a file is included twice,
it will lead to conflicts. To work around this problem, we can add header
guards.

It's just a `ifndef` checking if a constant isn't defined, and defining it if it
wasn't the case to prevent the file from being included again. For `fruits.h`,
the code with header guards looks this way.

```c
#ifndef FRUITS_H
#define FRUITS_H

#include "snake.h"

#include <stdbool.h>
#include <stdint.h>

#define SNAKE_MAX_FRUITS 5

typedef struct {
  uint16_t x;
  uint16_t y;
} fruit_t;

void init_fruits();
bool check_fruit_collision(snake_element_t snake_location);

#endif
```

I'll let you add the header guards in the other files.

Now all the infrastructure is implemented, let's add the glue in `main.c`.

```c
snake_element_t snake_location = get_snake_location();
if (check_fruit_collision(snake_location)) {
    add_snake_element();
}
```

Our snake can now eat fruits and grow, we can actually start calling this game
"Snake"! :tada:

I suggest you to do a git commit right now (as for each new feature) to save
your progress. In general, you should do one commit per tutorial part.
