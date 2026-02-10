# Part 10: Score calculator and saving

Our game is complete. However, playing is less fun when you don't have any
metric about your game. In snake, we can do so by counting the number of eaten
fruits.

## Counting score

The implementation itself isn't hard, it's just a counter.

In the `main()` function outside of the loop, we just add the current score
variable:

```c
uint32_t current_score = 0;
```

When we detect a fruit collision, we can just increase our counter:

```c
if (check_fruit_collision(snake_location, true)) {
    current_score += 1;
    add_snake_element();
}
```

## Displaying score

Having the score is a first step, but what we really care about is displaying
it.

The way I'm going to implement it is just removing the last two lines.

For reference, here are the sizes of the fonts:

| Font name | Width | Height |
| --------- | ----- | ------ |
| Large     | 10    | 18     |
| Small     | 7     | 14     |

In our case, implementing the behaviour is quite simple: we just need to change
the declaration of `SNAKE_MAX_Y_COORDINATE` to save 18 pixels at the bottom of
the screen.

```c
#define SNAKE_MAX_Y_COORDINATE (EADK_SCREEN_HEIGHT - 18) / SNAKE_SIZE - 1
```

And the magic is done! We now have enough space to display the score.

As the score management will in fact require different features (best score
saving/loading, display of score and best score), we will create a new file,
`score.c` (and the corresponding `score.h`).

In our `Makefile`, we declare this new file so we don't need to do so later:

```makefile
src = $(addprefix src/,\
  main.c \
  snake.c \
  fruits.c \
  score.c \
)
```

For this code, I will keep score tracking in `main.c` to avoid using a static
variable (which won't be really useful in this case, and minimizing the number
of global variables create more readable code). This is also to shows you it's
possible to work without them.

In Python, the code for displaying the score would be simple:

```python
from kandinsky import *

def display_score(score):
    draw_string("Score: " + int(score), 0, 240 - 18)
```

In C, we need to create the string ourselves, with a buffer.

First, we need to allocate a buffer which will store our generated string. For
this use case, a 50 bytes stack-allocated buffer will be enough.

Then, we need to generate the string. That's where the `sprintf` function from
`stdio.h` (standard library) is handy. If you have some C experience, you
probably know the `printf` function, which print data on the console. `sprintf`
is equivalent to `printf` but store the text in a buffer instead of console,
which is what we want. The syntax is also a bit similar to the old `format`
Python syntax, which you may know.

To be short, `sprintf` accept multiple arguments:

1. The buffer to store the generated string
2. A format string, containing raw text and special markers. In this example, we
   use `%ld` to mean "long unsigned". The full documentation is in [`sprintf(3)`](https://man.archlinux.org/man/sprintf.3.en#Length_modifier)
   man page. Be careful to use the right settings, otherwise `sprintf` may do
   weird things (for example, ignoring one of your arguments and always using
   "0" as a value instead).
3. The data to be used in place of the markers (in this case, `score`). You have
   to use the same number of args than markers used in the format string.

Finally, we display the string.

The resulting code is the following:

```c
#include <eadk.h>

#include <stdint.h>
#include <stdio.h>

void display_score(uint32_t score) {
    char buffer[50];
    sprintf(buffer, "Score: %lu", score);
    eadk_display_draw_string(buffer, (eadk_point_t){0, EADK_SCREEN_HEIGHT - 18}, true, eadk_color_white, eadk_color_black);
}
```

Afterward, we can add the declaration to `score.h`

```c
#ifndef SCORE_H
#define SCORE_H

#include <stdint.h>

void display_score(uint32_t score);

#endif
```

And call this function in `main.c`

```c
if (check_fruit_collision(snake_location, true)) {
    current_score += 1;
    add_snake_element();

    display_score(current_score);
}
```

A small but useful edit is to change the `error` function to not overwrite the
score so people can see their score when they lost:

```c
void error(char * message) {
  eadk_display_push_rect_uniform((eadk_rect_t){0, 0, 320, EADK_SCREEN_HEIGHT - 18}, eadk_color_red);
  eadk_display_draw_string(message, (eadk_point_t){0, 0}, true, eadk_color_black, eadk_color_white);
  eadk_timing_msleep(5000);
}
```

We just replaced `eadk_screen_rect` with `(eadk_rect_t){0, 0, 320, EADK_SCREEN_HEIGHT - 18}`
to not clear the whole screen.

We now have a working score :tada:

## Saving best score

Knowing your score is good, but improving it is better.

To save the best score between game, we need several components:

1. Calling the saving at useful moments
2. Formatting the data in a file
3. Writing the file to the storage

For the first point, we need to save each time the user eat something. An
alternative would be to save on game over, but an user could loose their current
score if the pressed Home or OnOff during the game (as they are handled
system-wide, with no way for the app to save any data).

For the second point, the file format I'll use is the following

| Offset | Size (bytes) | Description                                                        |
| ------ | ------------ | ------------------------------------------------------------------ |
| `0x0`  | 4 (32 bits)  | File version, currently `0` (may change in a future snake upgrade) |
| `0x4`  | 4 (32 bits)  | Best score, stored as an `uint32_t`                                |

Including the version in the file allow future-proofing the game, in case we
want to include any new data (e.g. last game score, user preferences…)

The third point is actually the most painful one: [accessing the storage](../apps/storage.md).
You can read the linked page for details, but in short: NumWorks doesn't allow
accessing the storage using any official API, so I wrote a custom storage driver
entirely running in an external app. This custom driver is used by virtually all
external apps accessing storage due to the lack of any official solution.

### Saving and loading the score in the storage

For me, it makes more sense to first deal with the storage stuff before adding
any code to display it.

So to begin, you need to import [storage.c](https://framagit.org/Yaya.Cout/numworks-extapp-storage/-/blob/master/src/storage.c)
and [storage.h](https://framagit.org/Yaya.Cout/numworks-extapp-storage/-/blob/master/src/storage.h)
in your `src` folder.

The next step is adding it to your `Makefile`:

```makefile
src = $(addprefix src/,\
  main.c \
  snake.c \
  fruits.c \
  score.c \
  storage.c \
)
```

You are now ready to use the storage.

#### File structure

The first step is to create a `struct` to represent our file. We will also add a
constant at the same time to control our file name.

```c
#define SNAKE_SAVE_FILE_NAME "snake.sav"

struct SaveFile {
    uint32_t version;
    uint32_t best_score;
};
```

This struct will hold our data, and with the magic of C casts, automatically
serialize and parse the file.

#### Saving to storage

So, to write a file to the storage, we need to generate the file, then save it.

To generate the file, we just initialize our struct with the correct values
(version 0 to be able to change the format later, and best score to the given
value).

To write a file to the storage, we actually need to ensure our file doesn't
exist yet (the calculator filesystem can have two files with the same name, and
`storage.c` doesn't have a failsafe for this case as it doesn't have a lot of
consequences). We can use `extapp_fileErase` for that, which automatically
delete the file if it exists and returns true, or false if the file doesn't
exist. We don't need to care about the returned value in our case.

The next step is to create a new file in the filesystem. The `extapp_fileWrite`
function does exactly that. It takes a filename, a `const char *` (pointer to
file content) and the data size as arguments.

The most complex bit is the syntax we are using to convert our struct to a
`const char *`. `data` isn't a pointer, it's a struct, directly allocated.
However, we need a pointer to give to `extapp_fileWrite`. In C, this is done
using the "address-of" operator (`&`), and is sometimes called "referencing". In
short, it just means we are transforming our data into a pointer to this data.

Once we have our pointer, we just need to cast it as a `const char *` to make
the compiler happy about types. A cast means we are replacing our type with
another, and usually doesn't change the underlying data.

The final code is the following, in `score.c`:

```c
#include "score.h"
#include "storage.h"

void save_best_score(uint32_t best_score) {
    const struct SaveFile data = {
        .version = 0,
        .best_score = best_score
    };

    extapp_fileErase(SNAKE_SAVE_FILE_NAME);

    extapp_fileWrite(SNAKE_SAVE_FILE_NAME, (const char *)&data, sizeof(data));
}
```

Of course, we add the prototype to `score.h`:

```c
void save_best_score(uint32_t best_score);
```

#### Loading from storage

As we added a way to save score, we need a way to load it.

The process is the same, but reversed: we are reading the file, checking if it
exists, parsing the data if it exists and returning the best score.

We are using `extapp_fileRead` to read the file, which returns a `const char *`
pointing to the file content. It also takes an argument, `file_len` in our case,
to store the size of the read file. We are also using the address-of operator to
pass a (mutable) pointer to our variable storing the file length to `extapp_fileRead`.
When reading the file, `extapp_fileRead` will dereference the pointer to set the
size in our variable.

`extapp_fileRead` will return `NULL` if the file couldn't be found, so we don't
have to check for file existence (with `extapp_fileExists` for example) before
reading it.

If the file doesn't exist, we assume the best score was 0 (which means the
current game will be the best one).

If the file exists, we parse the file. This is done by casting the file content
to our struct. Note that we are using a pointer to the struct in the file system
instead of a directly allocated struct as in `save_best_score`.

The last part is reading the score from the struct. This is done using the `->`
operator. In most languages, you are probably used to the `.` operator to access
a member of a struct/object. In C, both `.` and `->` exists:

- If the object is directly accessible (not a pointer) like in `save_best_score`,
  then you can access the data using `.` (`data.best_score`)
- If the object is a pointer, you can access the data using `->`, this is the
  case in our new function (`data->best_score`)

The loading code is just what I just explained, and may be more clear:

```c
uint32_t load_best_score() {
    size_t file_len = 0;
    const char * content = extapp_fileRead(SNAKE_SAVE_FILE_NAME, &file_len);

    if (content == NULL) {
        return 0;
    }

    const struct SaveFile * data = (const struct SaveFile *)content;

    return data->best_score;
}
```

Then we add the header part:

```c
uint32_t load_best_score();
```

And we're done with storage handling.

### Handling best score

Once we have the backend for the best score, we need to track it. This is much
more simple:

- At the beginning of our app, we load the best score from the file system
- When the current score is higher than our best score, we update the high score
  and save it.
- When drawing the score, we also need to draw the best score at the same time.

To load, the code is quite clear, using our new functions:

```c
uint32_t current_score = 0;
uint32_t best_score = load_best_score();
```

To update the new score, we do so in the collision check:

```c
if (check_fruit_collision(snake_location, true)) {
    current_score += 1;
    add_snake_element();

    if (current_score > best_score) {
        best_score = current_score;
        save_best_score(best_score);
    }

    display_score(current_score, best_score);
}
```

Notice I've already started implementing the best score drawing, by adding a new
argument to `display_score`.

Let's see the implementation:

In `score.c`, we add the argument to `display_score`, and we update the
`sprintf` call to show the new score.

```c
void display_score(uint32_t score, uint32_t best_score) {
    char buffer[50];
    sprintf(buffer, "Score: %lu, High: %lu", score, best_score);
    eadk_display_draw_string(buffer, (eadk_point_t){0, EADK_SCREEN_HEIGHT - 18}, true, eadk_color_white, eadk_color_black);
}
```

The last bit is `score.h`, to update the function prototype:

```c
void display_score(uint32_t score, uint32_t best_score);
```

Do you know what I'm going to tell you to do (again)? A git commit! :)

And we are done with the best score! :tada:
