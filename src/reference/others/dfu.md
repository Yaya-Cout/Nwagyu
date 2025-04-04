# Communication with the computer (DFU)

The calculator can communicate with the computer using the DFU (Device Firmware
Update) protocol

It's a standard USB protocol ([official USB specification]), but isn't widely
used by most devices.

ST also wrote their own documentation about the protocol ([ST documentation]).

The protocol itself is not very interesting on it's own. Here's a basic summary
of what's possible to do using DFU:

- Download, copying data from the computer to the calculator
- Upload, copying data from the calculator to the computer
- Detach, leaving DFU mode and (optionally) allow jumping to any address.
  Jumping to the firmware is called "manifest".

::: warning
Download and upload shouldn't be confused, as they are from the point of view of
the device (calculator) and not from the host (computer).
:::

As you can see, the protocol is very basic and low-level. The computer isn't
directly communicating with the calculator using special functions. Instead,
it's directly writing firmwares to flash or reading/writing storage to RAM,
based on [addresses and structures].

Some special handling is then done by the calculator firmware, for example
downgrading to "third-party" mode when trying to manifest a custom userland (see
[loading custom userland] for more details).

DFU process:

1. Calculator is enumerated by the computer and start the DFU entry procedure
2. Calculator jump to the DFU sub-firmware (simple function call)
3. Calculator call `willExecuteDFU` to disable interrupts
4. While the calculator isn't disconnected or detached, do DFU things
5. Detach and manifest a new firmware if asked by the computer
6. Calculator call `didExecuteDFU` to enable back interrupts
7. Calculator return from the DFU sub-firmware just like any other function
   using the stack

On N0100 and custom firmwares, DFU is running from RAM (copied before jumping)
to allow full flash rewriting including the area where the DFU code is living.
On Epsilon 16 and later, that's no longer the case and DFU code is stored in
external flash as a normal fonction.

It's important to note that the DFU firmware is running from the userland. As
external apps are mostly the same thing as a third-party firmware, they could in
theory execute DFU or even custom communication protocol over USB.

## Implementations

Even if DFU is a standard protocol, its implementations are not widespread.

### dfu-util

A generic CLI implementation called [dfu-util] is available on most Linux
distributions.

Here are some examples using dfu-util:

Dumping the RAM on N0110 and N0115:

```shell
dfu-util -i 0 -a 0 -s 0x20000000:force:0x40000 -U ram.bin
```

Dumping the external flash:

```shell
dfu-util -i 0 -a 0 -s 0x90000000:0x800000 -U external.bin
```

Dumping the internal flash (bootloader):

```bash
dfu-util -i 0 -a 0 -s 0x08000000:force:0x10000 -U internal.bin
```

Writing a binary to the external flash:

```shell
dfu-util -i 0 -a 0 -s 0x90000000 -D external.bin
```

Writing a binary to the external flash (bootloader):

```shell
dfu-util -i 0 -a 0 -s 0x08000000:leave -D output/release/device/n0110/bootloader.bin
```

Dumping internal flash is blocked on recent Epsilon versions. Dumping the flash
isn't necessary in most cases as the firmware can be found directly on NumWorks
website as documented in [Downloading Epsilon from NumWorks' website](downloading-epsilon.md).

### Upsilon.js

As said in [addresses and structures], [Upsilon.js] is a Javascript library
created to easily access the calculator from Web browsers and Node.js. In allow
parsing most structures, including storage read-write access.

It's based on WebUSB and a Node library called `webdfu` to implement the
low-level DFU communication.

It's for example used in [Upsilon Workshop] to transfer and read files from the
calculator on every calculator (including on Epsilon calculators) or
[Upsilon Website] to flash the firmware using DFU and restore the storage after
installation.

[NumWorks Connector] is another app built using [Upsilon.js], which allow
downloading every file from the calculator, including Python scripts, game saves
and even internal files like functions (it's not recommanded to reinstall them
on another version as the format isn't stable). It also allow downloading
everything as zip file, and uploading everything. It doesn't require an account
and can be used offline (with 2-3 edits in the source code).

The documentation of Upsilon.js is present in its readme and the apps presented
above are open-source if you want more examples of usages ([NumWorks Connector]
source code is located in `src/views/HomeView.vue` and is perhaps easier to
read than the others).

### WebDFU

[WebDFU for NumWorks] is a website implementing DFU in an easy-to-use way in a
web browser, without needing any installation (just the normal NumWorks driver
or udev rules).

It allows reading and writing flash, and [loading custom userland] without
flashing it again just using a single button.

It can be used instead of dfu-util if you prefer using a GUI, or to share slots
with someone else.

[official USB specification]: https://www.usb.org/sites/default/files/DFU_1.1.pdf
[ST documentation]: https://www.st.com/resource/en/application_note/cd00264379-usb-dfu-protocol-used-in-the-stm32-bootloader-stmicroelectronics.pdf

[dfu-util]: https://dfu-util.sourceforge.net/
[Upsilon.js]: https://github.com/UpsilonNumworks/upsilon.js/
[WebDFU for NumWorks]: https://ti-planet.github.io/webdfu_numworks/n0110/
[Upsilon Workshop]: https://yaya-cout.github.io/Upsilon-Workshop/
[NumWorks Connector]: https://yaya-cout.github.io/Numworks-connector/
[Upsilon Website]: https://getupsilon.web.app/install

[loading custom userland]: ../firmware/userland.md#loading-custom-userland

[addresses and structures]: ../firmware/addresses-structures.md
