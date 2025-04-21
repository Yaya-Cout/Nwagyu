# Userland

## Locked calculators with kernel (Epsilon)

The userland is the unprivileged part of the operating system on Epsilon. It
contain all the code that doesn't require privileged access to hardware. It
access the kernel the same way as external apps: using
[SVC calls](../apps/syscalls.md#manual-syscalls).

The userland is the only part of Epsilon with its source code available, but
their license prevent redistributing modified version (forking is allowed by
[GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#5-license-grant-to-other-users)). The source is
available on the GitHub repo
[numworks/epsilon](https://github.com/numworks/epsilon).

Even if technically forbidden by the license, NumWorks seems to accept pull
requests on their repository if you are patient enough.

Almost everything most user ever interact with is the userland: it contains the
GUI (Escher), apps, the calculation engine (Poincaré), the Python runtime
(MicroPython) and the [filesystem](addresses-structures.md) (stored in RAM).
<!-- TODO: Link to storage in the page -->

There is almost no difference between an userland an an external app, as both
are using SVC calls and are unprivileged.

### Loading custom userland

When loading an untrusted userland, you need to boot it using DFU from a booted
slot. To do so, the computer ask the calculator to jump to the userland address
(e.g. `0x90010000` for slot A).

When the calculator receive the jump request (called leave in DFU lingo), the
calculator will reset if the slot to boot is the currently running slot or if
the slot is invalid. If will then check if the currently loaded kernel version
is the same as the flashed userland. If the versions are different, it will show
a popup asking to upgrade the calculator. If the versions are the same, it will
enter the real boot procedure:

1. The kernel will be downgraded to "third-party" mode (essentially LED disabled
   and a popup on each suspend exit).
2. Finish the DFU exit to get back interrupts (see
   [On/Off and Home keys](../apps/onoff-home.md) for details about DFU syscalls)
3. Jump to the new userland.

Importants things to note are that:

- The custom userland will be loaded using the kernel from the other slot
- The DFU leave function is handled by the official userland, so any exploit on
  the official userland could allow loading a custom userland without
  downgrading the kernel security level (for example, to boot custom firmwares
  with exam mode support on locked calculators)
- Epsilon source code is under a proprietary license, so redistributing a
  modified version is forbidden. However, if a custom firmware with kernel
  support is created based on Epsilon 15 (or a fork such as Omega or Upsilon) or
  from scratch, redistribution would be allowed.

NumWorks published some documentation about this process:
[Build and run your own version of Epsilon](https://www.numworks.com/engineering/software/build/)

## Unlocked calculators

On unlocked calculators, the userland is privileged and merged with the kernel
as there is no real reason to separate both (one of the few reason to do so
would be to get full compatibility with NWA apps, but it's not planned for now
as it require a big rework of the operating system structure for a secondary
feature).
