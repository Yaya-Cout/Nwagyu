# Boot process

The calculator boot process is divided in multiple steps:

1. The first code loaded is the [bootloader] stored in the internal flash,
   verifying the signature of the [slot] then loading its [kernel] if the
   signature is valid
2. The [kernel] load the [userland] in unprivileged mode.
3. The [userland] is loaded, and launch the onboarding screen (selection of the
   language and country), then drop the user into the home screen.

On unlocked calculators with custom bootloaders (Omega and Upsilon), the
bootloader doesn't check the signature and kernel is not present (kernel is
merged with the userland, and everything is running in privileged mode).

[bootloader]: bootloader.md
[slot]: slots.md
[kernel]: kernel.md
[userland]: userland.md
