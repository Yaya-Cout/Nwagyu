# Part 6: Game over

The game is playable in this state, but you can't die so it's easy to have a
bigger snake. To avoid this problem, the snake game have a mechanism: if the
snake touch itself, it dies. We will implement this feature, and a game over
screen.

## Detecting snake collisions

In our implementation, we don't have a matrix to check for collisions, so we
have two options for checking collisions:

1. Reading from the framebuffer the new location color
2. Scan the whole snake list for collisions each time

Reading from the framebuffer is usually slow, and can have unwanted side
effects, for example due to precision loss in RGB565 conversions. I'm going to
describe how could we check using the framebuffer first, then explain the list
scanning version, which I'll use in the final version.

### Option 1: Reading from the framebuffer

To read from the framebuffer, we will use `eadk_display_pull_rect`. In this
example, I'm reading the whole snake square in a buffer for the demo, even if I
actually only read the first pixel from the square.

The code work as follows:

1. We define the area we want to read
2. Compute the buffer size
3. Allocate the memory using malloc (a stack allocation could have worked for
   such a small buffer, but it's a good example of malloc usage)
4. Pass the buffer and the area to `eadk_display_pull_rect` which will fill our
   buffer with the framebuffer data
5. Check the first pixel of our dumped framebuffer against the snake color
6. Free the memory used by the framebuffer

The actual implementation looks this way:

```c
bool check_snake_collision_framebuffer(snake_element_t location) {
    eadk_rect_t rect = {location.x * SNAKE_SIZE, location.y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE};
    size_t bufferSize = rect.width*rect.height*sizeof(eadk_color_t);

    eadk_color_t * pixels = (eadk_color_t *)malloc(bufferSize);

    eadk_display_pull_rect(rect, pixels);

    if (pixels[0 + 0 * SNAKE_SIZE] == eadk_color_white) {
        free(pixels);
        return true;
    }

    free(pixels);
    return false;
}
```

This implementation would work, but it's generally a bad idea to rely on the
framebuffer, unless you want to save RAM memory. This implementation also need
to be called before drawing the new snake location, otherwise the snake will
always be detected as colliding with itself

### Option 2: Scanning the list

This code is mostly classic C, by iterating over the whole list and checking
every individual item against the given coordinates:

```c
bool check_snake_collision(snake_element_t location, bool include_head) {
    for (int i = include_head ? 0 : 1; i < SNAKE_MAX_SIZE ; i++) {
        if ((SNAKE[i].x == location.x) && (SNAKE[i].y == location.y)) {
            return true;
        }
    }

    return false;
}
```

Notice we are iterating from 1 and not 0 if `include_head` is true, as we don't
want to check against current location in Game over check, but we can actually
want the other behaviour in other cases.

This function should also be made public in `snake.h` for future use:

```c
#include <stdbool.h>

bool check_snake_collision(snake_element_t location, bool include_head);
```

### Collision checking

Now we have the collision detection, we need to use it. As we also need handle
the game over screen, I prefer doing the magic in the `main.c`.

I'm not an artist, so I'll just reuse our `error` function to draw the Game over
screen.

The `main()` function will now contains the following code:

```c
snake_element_t snake_location = get_snake_location();

if (check_snake_collision(snake_location, false)) {
    error("Game over");
    return 0;
}

if (check_fruit_collision(snake_location)) {
    add_snake_element();
}
```

Feel free to try implementing a better screen in your own version.

### Avoid clearing the snake if the player moved just behind it

In the current state, an edge case happen when the head of the snake goes at the
end of the snake, at the place of the last element (which is disappearing). The
head of the snake is drawn before the last element being cleared, which results
in the head of the snake disappearing.

A quick fix is to check for this case at the end of `move()`:

```c
if ((SNAKE[max_snake_size].x != UINT16_MAX) && (SNAKE[max_snake_size].y != UINT16_MAX)) {
    if ((SNAKE[max_snake_size].x != SNAKE[0].x) || (SNAKE[max_snake_size].y != SNAKE[0].y)) {
        eadk_display_push_rect_uniform((eadk_rect_t){SNAKE[max_snake_size].x * SNAKE_SIZE, SNAKE[max_snake_size].y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE}, eadk_color_black);
    }
    SNAKE[max_snake_size] = (snake_element_t){UINT16_MAX, UINT16_MAX};
}
```

## Preventing fruits from spawning on the snake

If you play the game for a while, you will notice a small bug: fruits can spawn
on the snake, so you can't eat them while the snake is on it. It will also
disappear when the snake will be cleared, so it's not ideal.

Fortunately, a simple fix exist, by reusing `check_snake_collision`:

```c
void add_fruit() {
    int empty_fruit = -1;
    for (int i = 0; i < SNAKE_MAX_FRUITS ; i++) {
        if ((FRUITS[i].x == UINT16_MAX) && (FRUITS[i].y == UINT16_MAX)) {
            empty_fruit = i;
            break;
        }
    }

    if (empty_fruit == -1) {
        return;
    }

    for (int i = 0; i < SNAKE_FRUITS_MAX_TRY ; i++) {
        uint16_t x = eadk_random() % (SNAKE_MAX_X_COORDINATE);
        uint16_t y = eadk_random() % (SNAKE_MAX_Y_COORDINATE);

        if (check_snake_collision((snake_element_t){x, y}, true)) {
            continue;
        }

        if (check_fruit_collision((snake_element_t){x, y})) {
            continue;
        }

        FRUITS[empty_fruit] = (fruit_t){x, y };
        eadk_display_push_rect_uniform((eadk_rect_t){x * SNAKE_SIZE, y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE}, eadk_color_red);
        return;
    }
}
```

I refactored a bit the function to be a bit more optimized:

1. We try to find a place to store our fruit in the fruit list
2. We try several coordinates for fruit location
3. If the coordinate is colliding with the snake or a fruit, discard it and
   retry
4. Otherwise add it to the list

The use of a for loop prevent the game from freeing in case a fruit can't spawn
(which shouldn't happen with normal conditions).

`SNAKE_FRUITS_MAX_TRY` is defined in `fruits.h`:

```c
#define SNAKE_FRUITS_MAX_TRY 20
```

You can set a relatively high value, the goal is only to prevent the game from
getting stuck.

At this point, our snake is mostly ready. A few missing features are:

- Map edge handling (either by game over, or world-wrap)
- Progressive fruits spawning
- Best score tracking
- Potentially obstacles support
- Better interface

In the next section, we will implement map edges using world wrapping.

As always, don't forget to commit your work on your git repo!
