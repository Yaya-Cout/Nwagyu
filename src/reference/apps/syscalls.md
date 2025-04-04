# Syscalls

## Officially supported functions

When looking for officially supported methods in external apps, you can look in
`.local/lib/node_modules/nwlink/dist/eadk/eadk.h` (adapt the path based on how
you installed nwlink).

This file is also available in Epsilon source code at
[eadk/include/eadk/eadk.h](https://github.com/numworks/epsilon/blob/master/eadk/include/eadk/eadk.h).

<!-- TODO: Explain available functions -->

## Manual syscalls

Epsilon external apps are directly talking to the kernel the same way as the
userland does. It's working based on SVC calls.

The SVC table can be found at
[ion/src/device/shared/drivers/svcall.h](https://github.com/numworks/epsilon/blob/master/ion/src/device/shared/drivers/svcall.h#L46)
in Epsilon's source code.

Some of these calls are available in external apps through functions, but not
everything is available.

For example, to disable [On/Off and Home keys], we need to call unavailable
functions (`willExecuteDFU` and `suspend`), so we call them by hand.

To use them, you just need to use `asm("svc <SVC_INDEX>")`. To suspend the
calculator, you would call `asm("svc 44")`, as in the SVC table,
`SVC_POWER_SUSPEND` is declared as 44.

However, calling functions this way is not guaranteed to work on every Epsilon
version, as SVC numbers could change or functions could simply be removed. If a
function is available through EADK, you should use it.

[On/Off and Home keys]: onoff-home.md
