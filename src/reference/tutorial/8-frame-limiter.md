# Part 8: Frame limiter

Our code is fine, but we can't know how fast it will run. It's important to
handle this problem as N0120 is more than twice faster than N0110/N0115, which
means our game will be harder for N0120 users.

One common trick to avoid this issue is to never use `eadk_timing_msleep`. What
most people actually want is `eadk_timing_millis`.

## Python implementation

In Python, correctly implemented games use the following syntax:

```python
import time

TARGET_FRAME_DURATION = 0.020 # 20 ms
# Init stuff...

while True:
    frame_start = time.monotonic()

    # Do stuff...

    frame_end = time.monotonic()
    frame_duration = frame_end - frame_start
    time_to_sleep = TARGET_FRAME_DURATION - frame_duration
    time.sleep(time_to_sleep)
```

Some other implementations will use this kind of code instead:

```python
while time.monotonic() < (frame_start + TARGET_FRAME_DURATION):
    continue
```

(you can replace the `continue` with `time.sleep(0.001)` to save energy if you
want).

## NumWorks C implementation

On EADK, `time.monotonic()` equivalent is `eadk_timing_millis()`, which returns
the clock in milliseconds. The exact same code in Python would be
`time.monotonic() * 1000`.

First, we need to define our target time. It was previously hardcoded at 100 in
`eadk_timing_msleep(100)`, but we may want to adjust it in the future based on
score so let's declare a variable instead.

In `main()`, outside of the main loop, we add

```c
uint32_t target_frame_duration = 100;
```

In our main loop, we add the sleeping code, quite similar to the first Python
implementation

```c
while (true) {
    uint64_t frame_start = eadk_timing_millis();

    eadk_keyboard_state_t keyboard = eadk_keyboard_scan();

    // Rest of the mainloop

    if (check_fruit_collision(snake_location)) {
        add_snake_element();
    }

    uint64_t frame_duration = eadk_timing_millis() - frame_start;
    uint32_t timeToSleep = target_frame_duration - frame_duration;

    // Prevent overflow if frame_duration is higher than target_frame_duration
    if (timeToSleep > target_frame_duration) {
      timeToSleep = 0;
    }

    eadk_timing_msleep(timeToSleep);
}
```

As you can see, we mesure the duration of the whole loop, then compute how much
to sleep.

One important difference between C and Python is the risk of overflow. As said
in the last part, a negative uint is undefined behaviour. In this
implementation, we can have a negative `timeToSleep`, if the frame duration is
higher than the target time. To simplify the implementation, I've chosen to rely
on this overflow being higher than `target_frame_duration` and avoid sleeping in
this case, even if it's not technically valid.

## More complex frame limiters

This frame limiter is quite basic, but work well in most cases, assuming frame
duration is constant.

In more complex apps, more logic can be useful. For example, I wrote a special
frame limiter for Peanut-GB with "catch up" support. I didn't port the edits
over the NWA version yet, but the Upsilon version is available [here](https://github.com/UpsilonNumworks/Upsilon-External/blob/master/apps/Peanut-GB/speed.c#L17).

The Upsilon External syntax is similar to EADK (NumWorks probably reused
Omega/Upsilon syntax when writing it), so you should be able to understand it.

The main points:

1. If a frame is slower than the target duration, we add our delay to our "time
   budget", which tracks the delay we need to catch up
2. If a frame is faster than the target duration, instead of blindly waiting as
   in the implementation I used for the snake, we skip sleeping to catch up on
   our time budget. If we don't have time to catch up, then we can wait. There
   is also another case where we need to catch up and sleep for the same frame
3. The time budget is capped to 16 ms to avoid having too much time to catch up
   (for example, when switching from a slow game area to a fast area, which
   would try to catch up a lot of time)
4. If we are lagging behind (8 ms of time budget), then we switch to 30 FPS mode
   instead of 60 FPS (graphics being almost half of the frame duration) to
   reduce processing
5. If we are still lagging a lot behind (16 ms of time budget), then we switch
   to 15 FPS mode to drastically reduce processing. At this point, reducing the
   framerate even more won't make the game run faster (graphic processing has
   been reduced by a factor of 4) but will be really noticeable by users

This strategy is quite effective to maintain the best user experience while
running real time. Real game/emulators developers (like the Dolphin emulator for
Wii, which has a really great [blog](https://dolphin-emu.org/blog/)) will start
telling you you need to worry about frame pacing too, but let's try to get our
game run realtime before worrying about this kind of stuff.

If you are writing a ressource-intensive game, or would like to have your game
use the full potential of the N0120 while still running fine on N0110, this
trick will help you.

## Checking for keys during waiting time

If you play the game for a while, you will realize one issue: some fast key
press aren't registered when pressing them fast.

One potential fix is to check for pressed keys while waiting. The second Python
implementation allows doing this.

To do so, we can use the `do/while` C syntax, which will run a code one, then
check for the condition. It's like a while loop, but the first iteration is
always executed

The following code can be used at the end of the main loop instead of our msleep
implementation:

```c
do {
    eadk_keyboard_state_t keyboard = eadk_keyboard_scan();

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

    if (eadk_keyboard_key_down(keyboard, eadk_key_back) || eadk_keyboard_key_down(keyboard, eadk_key_home) || eadk_keyboard_key_down(keyboard, eadk_key_on_off)) {
        return 0;
    }

    eadk_timing_msleep(1);
} while (eadk_timing_millis() < (frame_start + target_frame_duration));
```

After adding this code, we can remove the old keyboard scan and key down checks.
If you try playing with these changes, you will notice the game is much more
reactive, and easier to play.

In the next section, we will implement progressive fruit spawning over time.

Don't forget to commit your work as usual!
