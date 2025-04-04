# Accessing storage

NumWorks doesn't provide any official API to access the storage of the
calculator. However, such a feature is essential to keep persistent state on
your application each time it's restarted, like saves for emulators or session
history in KhiCAS.

To solve this problem, a free (as in freedom) library was developed, called
[NumWorks Extapp Storage].

## Installation and usage

So, now we hyped you about this library, you are probably wondering about how to
use it in your project.

### Adding to your project

So, the first thing to do is to copy the [src/storage.c] and [src/storage.h]
files into your app source code. Then, you need to add it to your Makefile.

Here are some examples of modifications to the templates Makefiles:

::: code-tabs

@tab C

```makefile
# Add storage.c to your source files list
src = $(addprefix src/,\
  main.c \
  storage.c \
)
```

@tab C++

```makefile
# Add storage.c to your source files list
src = $(addprefix src/,\
  alien.cpp \
  life.cpp \
  main.cpp \
  rocket.cpp \
  spaceship.cpp \
  score.cpp \
  storage.c \
)

# Add this near the CXX definition line to add C files compilation support
$(addprefix $(BUILD_DIR)/,%.o): %.c | $(BUILD_DIR)
    @echo "C       $^"
    $(Q) $(CC) $(CFLAGS) $(SFLAGS) -c $^ -o $@
```

:::

<!-- TODO: Rust -->

Once you added it to your project, you are ready to start using the library

### Usage

To use the library, you will need to include `storage.h` inside the file where
you want to access the storage (you can use it in multiple files, the whole
library is fully stateless).

Some example of usages are provided inside the [src/main.c] file.

Basically, here is a minimal C++ file. We are using C++ inside this example but
storage access is done using the same exact API calls in C, the only difference
is the way we're using EADK, which is out-of-scope for this page.

```cpp
#include "storage.h"
#include "eadkpp.h"

int main(int argc, char * argv[]) {
    EADK::Display::pushRectUniform(EADK::Screen::Rect, Black);

    EADK::Point location(0, 0);
    if (extapp_fileExists("exists.py")) {
        EADK::Display::drawString("'exists'.py' found", location, true, Black, White);
    } else {
        EADK::Display::drawString("'exists'.py' NOT found", location, true, Black, Red);
    }

    EADK::Timing::msleep(2500);

    return 0;
}
```

Here are some basic examples for most use cases, mainly simplified versions of
[src/main.c]\:

::: details Reading files

```cpp
int main() {
    // The size of the file, will be set by fileRead
    size_t file_len = 0;

    // Store the pointer to the file content inside "content" and store its
    // size inside "file_len"
    const char * content = extapp_fileRead("read.py", &file_len);

    if (content == NULL) {
        // File not found, or error when reading storage
        return 1;
    }

    EADK::Point location(0, 0);

    // The file is found
    // For non-python files, you can directly use content.
    // For Python files, the first byte is a boolean controlling weather the
    // script will autoImport, so we need to skip it when reading the content
    EADK::Display::drawString(content + 1, location, false, White, Black);
    return 0;
}
```

:::

::: details Writing files

```cpp
int main() {
    // The content of the file to write
    // \0 is for disabled Python script auto importation
    const char * content = "\0This is a wonderful content with autoimport diasbled";

    // To compute the length of the file, we want to use strlen as we're writing
    // a string. However, strlen will stop to the first null byte, so we need to
    // skip it when doing the strlen and add it back after.
    // We also need to add the implicit null byte at the end of the string used
    // to signal the end of the string
    size_t len = 1 + strlen(content + 1) + 1;

    // Call the API method to write the file
    bool succeed = extapp_fileWrite("write.py", content, len);

    EADK::Point location(0, 0);
    if (!succeed) {
        // Error when writing, mostly because full storage
        return 1;
    }

    // File written successfully
    return 0;
}
```

:::

::: details Deleting files

```cpp
int main() {
    bool succeed = extapp_fileErase("delete.py");

    if (!succeed) {
        // Error when deleting, probably caused by not existing file
        return 1;
    }

    // File deleted successfully
    return 0;
}
```

:::

::: details Listing files

```cpp
#define MAX_FILES 20
int main() {
    // The file list
    char * filenames[MAX_FILES];

    // Request the storage API to put the pointers to the MAX_FILES first
    // filenames inside the filenames array
    int nb = extapp_fileList((const char **)filenames, MAX_FILES, "");

    // Check for error code
    if (nb == -1) {
        // Error when listing files
        return 1;
    }

    // Iterate over the file list to display each file to the screen
    for (int fileIndex = 0; fileIndex < nb; fileIndex++) {
        // Filename is accessible with filenames[fileIndex]
        EADK::Point location(0, 15 * fileIndex);
        EADK::Display::drawString(filenames[fileIndex], location, false, White, Black);
    }

    return 0;
}
```

:::

::: details Checking if a file exists

The previous section described how to get a list of the storage, but
it require a maximum number of files and allocating a buffer. `fileExists` was
designed to avoid this problem and allowing easier checks.

```cpp
int main() {
    if (extapp_fileExists("exists.py")) {
        // File is found
    } else {
        // File not found
    }
    return 0;
}
```

:::

::: details Getting filesystem statistics

```cpp
int main() {
    // Used space
    uint32_t used = extapp_used();

    // Total available space
    uint32_t storageSize = extapp_size();

    // Free space
    uint32_t freeSpace = storageSize - used;

    // Calculator model
    uint8_t model = extapp_calculatorModel();
}
```

:::

## How does it work

Internally, the library directly parse the storage inside the RAM, and is fully
stateless. On each call, the library does the following steps:

1. Figuring out the calculator model based on userlandMagic (more reliable
   methods could be added in the future, but unless the user flash an N0110
   firmware on one of the slots of its N0120 or an N0120 firmware on an N0110,
   the current way is working). See [Determining device model] for details.
2. Determine the userland address based on the model
3. Get the storage address from the userland header (found based on the userland
   address)
4. Check if storage magics are valid and fail if they aren't (not technically
   required)
5. Read the storage directly and parse it to do what the function is meant to do

The storage structure is described in [storage structure].

[NumWorks Extapp Storage]: https://framagit.org/Yaya.Cout/numworks-extapp-storage
[src/storage.c]: https://framagit.org/Yaya.Cout/numworks-extapp-storage/-/blob/master/src/storage.c
[src/storage.h]: https://framagit.org/Yaya.Cout/numworks-extapp-storage/-/blob/master/src/storage.h
[src/main.c]: https://framagit.org/Yaya.Cout/numworks-extapp-storage/-/blob/master/src/main.cpp
[Determining device model]: ../firmware/addresses-structures.md#determining-device-model
[Storage structure]: ../firmware/addresses-structures.md#storage-structure