# Part 4: Handling snake length

For now, our snake is a simple square moving on the screen. Can we make it
become longer than that?

That's the goal of this part. At the end of this page, you will have a fully
working snake with each of its coordinates stored in a sliding list.

## Creating the list

First, we need a way to store the snake. There are multiple solutions, each one
with a drawback:

- A matrix saving the state of each cell of the screen, but with a big buffer
  size, and with the issue of saving the order of snake elements
- A list, but with harder collision checks, which require comparing each element
  of each list against each other (snake positions collisions, head of
  snake-food collisions, head of snake-wall/obstacles collisions)
- A combinaison of both: a list to save the order of snake elements + a matrix
  to save the whole state with easy collision checks, but with higher memory
  requirements

As the main limitation on NumWorks is the memory (≈100KiB for NWA apps, 256KiB
total for N0110/N0115, 564KiB total on the N0120 but only 256 KiB mapped for
consistency with N0115) instead of the CPU, we will choose the list-based
approach. In another context (e.g. Numcraft or emulator), we could have chosen
something else as CPU speed is a limiting factor.

So, now we have decided to use a list, we have several options:

### Statically allocated list

A list with a compile-time fixed size, with no risk of memory allocation failure
at runtime.

To create one, use the following syntax (generally used in the global context,
outside functions):

```c
static int my_array[1000] = { 0 };
```

Each use of the array will use the same instance, and it will be valid during
the whole program execution.

### Dynamic allocation

Dynamic allocation works using `malloc`/`free`, which allow selecting memory
size at runtime with the risk of memory fragmentation and allocation failure
(NumWorks made a great [article](https://www.numworks.com/fr/blog/eviter-utilisation-malloc/)
in french about how and why they wrote Epsilon, the calculator firmware, without
using any `malloc`)

To allocate using malloc two strategies exists:

1. Using the same way as a static list (which is what Python do for example)
2. Having each element of the list being stored in a mallocated buffer with each
   element pointing to the next item of the list, like a chain

The first type is the most common, and here is the most classic usage:

```c
#include <stdlib.h>
#include <string.h>

int * allocate_array() {
  int * my_array = (int *)malloc(1000);

  if (my_array == 0) {
    // Allocation failure detected, should be handled appropriately
    return 0;
  }

  memset(my_array, 0, 1000);

  // You can use calloc instead of malloc to force the memory to be initialized
  // to zero, removing the need for the memset

  return my_array;
}

void deinit_array(int * my_array) {
  free(my_array);
}

int main() {
  int * my_array = allocate_array();

  // Do stuff with the array
  my_array[50] = 10;

  deinit_array(my_array);

  // You shouldn't use the array anymore after freeing it, its content is now
  // supposed to be garbage (even if it may still contains your data for a
  // while, it could change at any moment without warning)
}
```

You can also use `realloc` to increase the size of an existing allocation

The second way has the advantage of avoiding the reallocation issue completely
and being able to deal with memory fragmentation, but is slower.

### Stack allocation

Stack allocation is similar to `malloc` in many ways, as the memory size can be
determined at runtime, but have one main difference to malloc: memory stored
inside can never be returned. The stack follows one basic rule: don't look up.
If a function store data on the stack then return an allocated buffer to the
caller, then the caller will receive undefined memory.

It also means you don't have to free it, which is quite useful to avoid memory
leaks.

However, the nature of the stack means allocations will never fail, but will
instead silently overwrite the heap (on a computer, there are detections to
protect against this kind of corruption). On Epsilon, the stack is around
32 KiB (the userland already use some of it), so you should avoid allocating any
big buffers on it to prevent corruption (max 20 KiB total allocated memory on
the stack to play safe).

Dynamically and statically memory are stored on the same area on Epsilon, but
the stack is independent. This means storing some data on the stack can be
useful if your app need lots of memory and doesn't recurse a lot.

An example of usage:

```c
void subcallee(int * buffer) {
  // This function can edit the buffer as it's higher on the call stack and will
  // "look down" to see the stack allocated buffer
  buffer[98] = 2;
}

void callee() {
  int * buffer[100];
  buffer[99] = 1;
  subcallee(buffer);
  if (buffer[98] == 2) {
    // Code executed correctly
  } else {
    // Shouldn't happen
  }

  // DON'T DO THAT:
  // return buffer
  // Buffer won't be valid after the function return, so it can't be returned
  // The caller function would otherwise have to "look up" on the stack in the
  // child function data, which won't exist anymore
}

void caller() {
  callee()
}
```

### Implementation

For our app, we will use a statically allocated list, with an high cap on the
maximum snake size (like 1000) to be almost sure the user never encounter it
which will simplify memory management.

So, to clean up the code a bit, let's create a new file: `snake.c` (and
`snake.h`)

The first step when adding new files is to add them to the `Makefile`. Edit the
Makefile to use the following source files:

```makefile
src = $(addprefix src/,\
  main.c \
  snake.c \
)
```

In `snake.h`, we can already create the constant containing the maximum size:

```c
#define SNAKE_MAX_SIZE 1000
```

We will also use a struct to represent one element of the snake in the list,
this will allow us to write things like `SNAKE[0].x` in the future:

```c
#include <stdint.h>

typedef struct {
  uint16_t x;
  uint16_t y;
} snake_element_t;
```

In `snake.c`, we will create the list in a global context. This isn't
"thread-safe" but as the calculator isn't multithreaded, we can make the
assumption the global variable isn't going to be used by different functions at
the same time. On a computer, the same assumption could be false, and I would
prefer a single pointer policy (like Rust ownership or the API of [libfunnel](https://libfunnel.readthedocs.io/en/latest/)).

```c
#include "snake.h"

static snake_element_t SNAKE[SNAKE_MAX_SIZE];
```

Having the list as a global variable will simplify the code as we won't need to
pass the pointer to the list for each call. In C++/Rust, the Snake should be an
object, with the array local to the object instance instead.

Our list now exist, but only contains garbage for now. We need to initialize it.
To do so, we could use `memset` (see the `malloc` usage example), but it's not
ideal for initializing struct lists.

Instead, we will simply use a for loop.

We now need to know to which state do we want to init the list. In our case,
zero initialization isn't correct, because it's a valid snake coordinates.
`UINT16_MAX` contains the maximum value storable on an `uint16_t`, and shouldn't
be reached during execution, so we will use that as uninitialized state marker.

The initialization will be done as such:

```c
void init_snake(snake_element_t original_location) {
    for (int i = 0; i < SNAKE_MAX_SIZE ; i++){
        SNAKE[i] = (snake_element_t){UINT16_MAX, UINT16_MAX };
    }
    SNAKE[0] = original_location;
}
```

We now need to call that function in `main.c`. However, `main.c` doesn't know
anything about the `init_snake()` function. That's the main reason `.h` files
exists.

In `snake.h`, we will declare our new (public) function:

```c
void init_snake(snake_element_t original_location);
```

In our `main.c` function, we will now init the snake before the main loop.

At the top of the file, include the snake header

```c
#include "snake.h"
```

And then, at the top of the `main` function, we will init our snake, spawning at
(0,0):

```c
init_snake((snake_element_t){0, 0});
```

## Handling snake motion

We now have a list, it's a good starting point. The snake doesn't move yet, so
let's refactor our code a bit to be able to do it in a clean way.

### Moving snake management to `snake.c`

We will now move the snake
direction management from `main.c` to `snake.c`.

Move `SNAKE_DIRECTION_*` declarations from `main.h` to `snake.h`, then define
`direction` as a global static variable in `snake.c`:

```c
static int direction = SNAKE_DIRECTION_RIGHT;
```

We will now add wrappers to change the `direction`, so `main.c` doesn't need to
care about handling the snake:

```c

void up() {
    if (direction != SNAKE_DIRECTION_DOWN) {
        direction = SNAKE_DIRECTION_UP;
    }
}

void right() {
    if (direction != SNAKE_DIRECTION_LEFT) {
        direction = SNAKE_DIRECTION_RIGHT;
    }
}

void down() {
    if (direction != SNAKE_DIRECTION_UP) {
        direction = SNAKE_DIRECTION_DOWN;
    }
}

void left() {
    if (direction != SNAKE_DIRECTION_RIGHT) {
        direction = SNAKE_DIRECTION_LEFT;
    }
}
```

Now declare the prototypes in `snake.h`:

```c
void up();
void right();
void down();
void left();
```

And now, we can simplify the snake direction management from `main.c`:

```c
if (eadk_keyboard_key_down(keyboard, eadk_key_up)) {
  up();
}
if (eadk_keyboard_key_down(keyboard, eadk_key_right)) {
  right();
}
if (eadk_keyboard_key_down(keyboard, eadk_key_down)) {
  down();
}
if (eadk_keyboard_key_down(keyboard, eadk_key_left)) {
  left();
}
```

### Moving snake

We will start by implementing a snake which only adds new elements, without
deleting the old ones.

First, we will expose our `error()` function from main.c: In `main.h` add

```c
void error(char * message);
```

Then, we can implement a `move()` function, which will slide the list to free
the first element of the list, then add the new coordinates to this free slot
and draw the new snake element:

```c
void move() {
    memmove(SNAKE + 1, SNAKE, sizeof(SNAKE) - sizeof(snake_element_t));

    switch (direction) {
        case SNAKE_DIRECTION_UP:
            SNAKE[0] = (snake_element_t){SNAKE[1].x, SNAKE[1].y - 1};
            break;
        case SNAKE_DIRECTION_RIGHT:
            SNAKE[0] = (snake_element_t){SNAKE[1].x + 1, SNAKE[1].y};
            break;
        case SNAKE_DIRECTION_DOWN:
            SNAKE[0] = (snake_element_t){SNAKE[1].x, SNAKE[1].y + 1};
            break;
        case SNAKE_DIRECTION_LEFT:
            SNAKE[0] = (snake_element_t){SNAKE[1].x - 1, SNAKE[1].y};
            break;
        default:
            error("Invalid direction");
            return;
    }

    eadk_display_push_rect_uniform((eadk_rect_t){SNAKE[0].x * SNAKE_SIZE, SNAKE[0].y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE}, eadk_color_white);
}
```

We will also need a few includes:

```c
#include "main.h"

#include "eadk.h"
#include <stdlib.h>
#include <string.h>
```

We can now declare our function in `snake.h`:

```c
void move();
```

And call it from `main.c`:

```c
move();
```

Our old code in `main()` can now be removed (everything still referencing `x`,
`y` and `direction`).

### Setting a maximum snake size

Our snake is currently always growing, so we need to actually cap its size. We
will define an initial size in `snake.h` to begin with:

```c
#define SNAKE_INITIAL_SIZE 5
```

In `snake.c`, we will create a static variable to store the current size (we
will have to increase it in the future when eating fruits):

```c
static int max_snake_size = 5;
```

Note that `max_snake_size` should be smaller or equal to `SNAKE_MAX_SIZE - 2` to
prevent bugs in our implementation, which is considered to be a fair tradeoff.

In `move()`, we will have to clear the last item of the list based on
`max_snake_size`, if it exists.

The code is quite simple, with our list:

```c

if ((SNAKE[max_snake_size].x != UINT16_MAX) && (SNAKE[max_snake_size].y != UINT16_MAX)) {
    eadk_display_push_rect_uniform((eadk_rect_t){SNAKE[max_snake_size].x * SNAKE_SIZE, SNAKE[max_snake_size].y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE}, eadk_color_black);
    SNAKE[max_snake_size] = (snake_element_t){UINT16_MAX, UINT16_MAX};
}
```

We are doing 3 things in this code:

1. Checking weather the last element is valid. This is useful to avoid drawing
   out of screen when the snake size on screen isn't equal to max_snake_size
   (which is the case when the snake is growing at startup or when eating)
2. Actually clearing the screen for the disappearing part of the snake
3. Removing the snake element from the list

With this small change, our game look closer to a real snake, which can move of
the screen. :tada:

Our next step: implementing fruits
