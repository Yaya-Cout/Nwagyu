# Bootloader

The bootloader is the very first part of the code loaded on boot and is stored
in the internal flash.

## Locked calculators (Epsilon)

On locked calculators, the bootloader is always loaded, even in BOOT1 mode
(pressing RESET + 6). When loaded, it does a few basic things:

1. Checking if the 6 key is pressed. If it's pressed, it will enter DFU mode to
   write the external flash from a computer and display `numworks.com/rescue`.
   If not pressed, it will continue booting
2. Checking the signature of the kernels. If the signature of the first [kernel]
   is valid, it will load it. If not, it will check the [kernel] in the second
   [slot]. If the second [kernel] is valid, it will be loaded. If not, it will
   refuse to boot, enter DFU mode and show the `numworks.com/rescue` screen

The bootloader is meant to be read-only, but the flash is only locked in
[userland], the kernel can rewrite the bootloader.

Epsilon bootloader source was never published publicly, even not under a
proprietary license.

## Unlocked calculators (Upsilon)

### Custom bootloader

To keep this page concise, we will only describe Upsilon bootloader.
Implementations of other bootloaders (Omega/Khi) could be a bit different,
especially with flash locking.

On boot, it will check if the exam mode is enabled. If it's enabled, it will
immediately load the slot where exam mode is active. If not, it will show an
animation then show a menu with different actions. It will propose 3 [slots]:
the slot A (key 1), slot Khi (key 2) and slot B (key 3).

The user can also enter the "Installer mode" submenu (key 4) to get a choice
between "Flash slots" and "Flash bootloader".

Flash slots is like the `numworks.com/rescue` screen, with only the external
flash writable by a computer. Flash bootloader is a shortcut to jump to the
[STM32 bootloader](#stm32-bootloader) to flash the bootloader.

The boot process is very simple:

1. Check if the slot to boot is valid (check headers)
2. Lock the internal flash to avoid getting the bootloader replaced by a
   malicious firmware, especially when loading Epsilon (erasing is permitted,
   but writing won't work)
3. Lock the other [slot] to avoid having one slot rewriting the other one or
   enabling exam mode for a slot incompatible with exam mode
4. Boot the slot by jumping to the entrypoint/kernel.

### STM32 bootloader

The STM32 bootloader integrated into the MCU. It's loaded by pressing RESET + 6,
and will fully bypass the custom bootloader. It allows flashing internal flash
and writing a flasher to the RAM using DFU.

Writing the internal flash can be used when installing a bootloader, but is not
much used in most cases.

Writing a flasher is more used (also known as recovery mode). It work by writing
a firmware into the RAM, then telling the bootloader to jump on it. The
bootloader will have drivers to write the external flash.

<!-- TODO: Flowcharts -->

[kernel]: kernel.md
[userland]: userland.md
[slot]: slots.md
[slots]: slots.md
