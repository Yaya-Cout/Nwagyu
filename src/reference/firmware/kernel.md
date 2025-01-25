# Kernel

Kernel is the privileged part of the operating system on Epsilon. It's running
in privileged mode and has full access over the hardware.

When loaded, it will check the signature of the [userland] then load it if the
signature is correct.

It's possible to load an unsigned userland from a computer, but the kernel will
downgrade to a mode where the LED will be disabled (so no exam mode) and with a
popup on each suspend exit telling the firmware is not official.

The kernel also contains the hardware drivers. Some control over the hardware is
exposed as [SVC calls](../apps/syscalls.md#manual-syscalls), but most of the
work

The [source code of the kernel] was available under a proprietary license up to
Epsilon 18.2.2, but was removed from the source code on newer versions after the
publication of the Phi jailbreak, which exploited a
[vulnerability in the screen driver](https://blog.mfriess.xyz/screenhax/).

[userland]: userland.md
[source code of the kernel]: https://github.com/numworks/epsilon/tree/18.2.2/ion/src/device/kernel
