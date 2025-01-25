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

There is almost no difference between an userland an an external app, when as
both are using SVC calls and are unprivileged.

## Unlocked calculators

On unlocked calculators, the userland is privileged and merged with the kernel
as there is no real reason to separate both (one of the few reason to do so
would be to get full compatibility with NWA apps, but it's not planned for now
as it require a big rework of the operating system structure for a secondary
feature).
