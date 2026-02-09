# Part 9: Progressive fruits spawning

We could tell our game is finished right now. In fact, it's already much more
playable than most Python implementations with our key check between frames.

However, a cool feature could be having multiple fruits spawning over time with
an higher probability when no fruit was eaten in a while.

The code is quite simple: we simply set a date to select the next time a fruit
should spawn.

In `fruits.h`, we add our constant:

```c
#define SNAKE_MAX_FRUIT_SPAWN_TIME 15000
```

In `fruits.c` we add the required static variable, then code to init it
(otherwise it would be null and always trigger a new fruit at startup)

```c
static uint64_t next_fruit_spawn = 0;

void init_fruits() {
    for (int i = 0; i < SNAKE_MAX_FRUITS ; i++) {
        FRUITS[i] = (fruit_t){UINT16_MAX, UINT16_MAX };
    }

    add_fruit();
    next_fruit_spawn = eadk_timing_millis() + (eadk_random() % SNAKE_MAX_FRUIT_SPAWN_TIME);
}
```

The real code is in a new function which is called at every frame:
`random_fruit_spawn`, which will add a new fruit if necessary.

```c
void random_fruit_spawn() {
    if (eadk_timing_millis() >= next_fruit_spawn) {
        add_fruit();
        next_fruit_spawn = eadk_timing_millis() + (eadk_random() % SNAKE_MAX_FRUIT_SPAWN_TIME);
    }
}
```

As usual, we add the declaration in `fruits.h`

```c
void random_fruit_spawn();
```

Then, we call it in `main.c`, just after the call to `move()`

```c
random_fruit_spawn();
```

You should commit your work on git now.

## Fixing fruits collision checks

While checking this code, I realized a small bug which should be fixed (thanks
to `clang-tidy` I use to check my code): `add_fruit` is calling
`check_fruit_collision`, which does almost what we want. There are two issues
with the current code:

1. `check_fruit_collision` remove the fruit in case of a collision, which isn't
   what we want when spawning a new fruit
2. `check_fruit_collision` also calls `add_fruits` (through
   `add_fruit_if_empty`), which can lead to recursive calls and possibly stack
   overflow

Fortunately, the fix is quite simple: just add an argument to
`check_fruit_collision` to prevent removing fruits (and removing the call to
`add_fruits` at the same time).

```c
bool check_fruit_collision(snake_element_t snake_location, bool remove) {
    for (int i = 0; i < SNAKE_MAX_FRUITS ; i++) {
        if ((FRUITS[i].x == snake_location.x) && (FRUITS[i].y == snake_location.y)) {
            if (remove) {
                FRUITS[i] = (fruit_t){UINT16_MAX, UINT16_MAX};
                add_fruit_if_empty();
            }

            return true;
        }
    }

    return false;
}
```

We update the corresponding signature in the header file:

```c
bool check_fruit_collision(snake_element_t snake_location, bool remove);
```

The call in `main.c`:

```c
if (check_fruit_collision(snake_location, true)) {
```

And finally the call in `fruits.c`:

```c
if (check_fruit_collision((snake_element_t){x, y}, false)) {
```

This doesn't fix the warning given by `clang-tidy` (which would probably be
fixed by duplicating the function instead of using a parameter), but this should
fix our bug.

This is a great example of how can small sneaky errors in C go undetected for a
while, so I decided to keep track of it in this tutorial

As always after a bug fix, create a new git commit to save your edits

I hope next time we won't have to do bugfixing again, as we will work on score
calculation, with best score saving.
