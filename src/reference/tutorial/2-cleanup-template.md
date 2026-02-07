# Part 2: Cleaning up the template

Now that you have a base app and know how to install your app, we will start the
last bit of preparation before app creation: removing useless things from the
template (I will add them back during the tutorial if needed)

The template contains lots of unnecessary code (at least for now), so I
recommand you to backup the original `main.c` file and create a new one with the
following content:

```c
#include <eadk.h>

const char eadk_app_name[] __attribute__((section(".rodata.eadk_app_name"))) = "Snake";
const uint32_t eadk_api_level  __attribute__((section(".rodata.eadk_api_level"))) = 0;

int main(int argc, char * argv[]) {
  eadk_display_draw_string("Hello, world!", (eadk_point_t){0, 0}, true, eadk_color_black, eadk_color_white);
  eadk_timing_msleep(3000);
}
```

Notice I've changed the app name from "App" to "Snake" in the process.

We won't need the external data for now, so remove the `input.txt` file and its
references in the Makefile (be careful to not replace the tabulations by spaces)

```makefile
.PHONY: run
run: $(BUILD_DIR)/app.nwa
	@echo "INSTALL $<"
	$(Q) $(NWLINK) install-nwa $<

$(BUILD_DIR)/%.bin: $(BUILD_DIR)/%.nwa
	@echo "BIN     $@"
	$(Q) $(NWLINK) nwa-bin $< $@

$(BUILD_DIR)/%.elf: $(BUILD_DIR)/%.nwa
	@echo "ELF     $@"
	$(Q) $(NWLINK) nwa-elf $< $@
```

We now have a "blank" project which we can use for creation.

In the next section we will create a snake controlled by the arrow keys.
