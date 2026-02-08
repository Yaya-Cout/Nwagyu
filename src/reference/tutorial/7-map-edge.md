# Part 7: Map edge handling

Our snake is working, but there are still a few bugs to iron out. The most
important one is the snake getting out of the screen: once it gets out of the
screen, `eadk_display_push_rect_uniform` start doing weird things and our snake
can't eat anymore.

Two solutions exists:

1. Killing the snake when touching the wall
2. Wrapping around the screen

At this point, you should be able to implement both by yourself, so I'm going to
implement only the second one.

## Wrapping around the screen

To wrap around the screen, we have to use chained if. This is because we can't
have negative values in our coordinates as they are `uint16_t`, which are
unsigned.

Technically, storing -1 in an `uint16_t` is undefined behaviour, which means the
compiler can do anything. Usually storing `-1` in an `uint16_t` will be saved as
`65535`, but your compiler can use any value instead, like 0, 1, 100. It is also
technically allowed to do stupid things, like formatting your hard drive (most
compiler won't do that, I agree, but they are allowed to).

Undefined behaviour was made to ease C compiler writing, but is now one of the
biggest problems of C/C++ (and is one of the reason of the popularity of Rust),
so we need to be careful when dealing with such cases.

If you are interested in details about undefined behaviour, this blog post is
really interesting: <https://blog.regehr.org/archives/213>.

To come back to our snake, this means we need to know if our value would return
0 before actually doing the computation, which means we have to use if.

This is the modified part of the `move()` function of `snake.c`

```c
switch (direction) {
    case SNAKE_DIRECTION_UP:
        if (SNAKE[1].y == 0) {
            SNAKE[0] = (snake_element_t){SNAKE[1].x, SNAKE_MAX_Y_COORDINATE};
        } else {
            SNAKE[0] = (snake_element_t){SNAKE[1].x, SNAKE[1].y - 1};
        }
        break;
    case SNAKE_DIRECTION_RIGHT:
        if (SNAKE[1].x == SNAKE_MAX_X_COORDINATE) {
            SNAKE[0] = (snake_element_t){0, SNAKE[1].y};
        } else {
            SNAKE[0] = (snake_element_t){SNAKE[1].x + 1, SNAKE[1].y};
        }
        break;
    case SNAKE_DIRECTION_DOWN:
        if (SNAKE[1].y == SNAKE_MAX_Y_COORDINATE) {
            SNAKE[0] = (snake_element_t){SNAKE[1].x, 0};
        } else {
            SNAKE[0] = (snake_element_t){SNAKE[1].x, SNAKE[1].y + 1};
        }
        break;
    case SNAKE_DIRECTION_LEFT:
        if (SNAKE[1].x == 0) {
            SNAKE[0] = (snake_element_t){SNAKE_MAX_X_COORDINATE, SNAKE[1].y};
        } else {
            SNAKE[0] = (snake_element_t){SNAKE[1].x - 1, SNAKE[1].y};
        }
        break;
    default:
        error("Invalid direction");
        return;
}
```

## Better self-killing prevention

The game currently prevent you from killing yourself by doing an U-turn. The
current logic is however flawed: if you are going left, then press both the up
and right keys, you will instantly die.

This is because the direction will first be updated to go up, then go right,
which is considered to be a legitimate move, and would be if the snake moved
between both key press.

To fix this bug, we will simply save in another global variable the used
direction in `move`.

The whole fix is contained in `snake.c`:

First step: declaring a new variable

```c
static int last_direction = SNAKE_DIRECTION_RIGHT;
```

Second step: updating the last direction in `move()`

```c
last_direction = direction;
```

Last step: using `last_direction` instead of `direction` in the direction
functions:

```c
void up() {
    if (last_direction != SNAKE_DIRECTION_DOWN) {
        direction = SNAKE_DIRECTION_UP;
    }
}

void right() {
    if (last_direction != SNAKE_DIRECTION_LEFT) {
        direction = SNAKE_DIRECTION_RIGHT;
    }
}

void down() {
    if (last_direction != SNAKE_DIRECTION_UP) {
        direction = SNAKE_DIRECTION_DOWN;
    }
}

void left() {
    if (last_direction != SNAKE_DIRECTION_RIGHT) {
        direction = SNAKE_DIRECTION_LEFT;
    }
}
```

## Better snake initialization

Currently, even if the snake is supposed to spawn at (0,0), it's only drawn at
(1,0), in `move`.

The fix is again one line: drawing the snake in `init_snake`:

```c
eadk_display_push_rect_uniform((eadk_rect_t){original_location.x * SNAKE_SIZE, original_location.y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE}, eadk_color_white);
```

I agree, this part was mostly bugfixing, which isn't really interesting, but
fixing bugs will allows us to focus on other things.

In the next part, we will implement a constant-time frame duration.
