# Part 13: Increasing speed

The snake game gets progressively harder over time due to the snake tail length
increasing, but once you have some strategies, you can manage to almost never
die. To reduce this problem, we will add a small difficulty touch: increasing
the snake speed when a fruit is eaten

First, we need to decide what are the difficulty parameters, our constants:

- Initial speed, which I've set to 100ms between each frame
- Minimal speed, at 40ms between each frame
- Speed change when a fruit is eaten, at -2ms/fruit

In `main.h`, we can declare them:

```c
#define SNAKE_INITIAL_SPEED 100
#define SNAKE_MIN_SPEED 40
#define SNAKE_SPEED_CHANGE 2
```

We now need to decrease the frame duration when a fruit is eaten, which is easy
given we already have a check increasing the score.

After `display_score` in `main.c`, we just need to add the following code:

```c
target_frame_duration -= SNAKE_SPEED_CHANGE;
if (target_frame_duration < SNAKE_MIN_SPEED) {
    target_frame_duration = SNAKE_MIN_SPEED;
}
```

Our game is now more difficult.

As the game is now faster, an issue can be noticed: if you are pressing two
arrows at the same time, only one will be taken into account. This can be
improved by ignoring the current direction key in addition to the U-turn
prevention.

In `snake.c`, we just need to add the check

```c
void up() {
    if (last_direction != SNAKE_DIRECTION_DOWN && last_direction != SNAKE_DIRECTION_UP) {
        direction = SNAKE_DIRECTION_UP;
    }
}

void right() {
    if (last_direction != SNAKE_DIRECTION_LEFT && last_direction != SNAKE_DIRECTION_RIGHT) {
        direction = SNAKE_DIRECTION_RIGHT;
    }
}

void down() {
    if (last_direction != SNAKE_DIRECTION_UP && last_direction != SNAKE_DIRECTION_DOWN) {
        direction = SNAKE_DIRECTION_DOWN;
    }
}

void left() {
    if (last_direction != SNAKE_DIRECTION_RIGHT && last_direction != SNAKE_DIRECTION_LEFT) {
        direction = SNAKE_DIRECTION_LEFT;
    }
}
```

This now allows you to press two keys at the same time, and the snake will
alternatively choose one or another depending on the current direction. You can
use this behavior to move diagonally, for example.

That's it for this part

Don't forget to commit your work!
