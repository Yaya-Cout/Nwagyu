# On/Off and Home keys

On/Off and Home key access would be great for many apps, especially emulators.
However, when pressing Home, the calculator goes back to the main screen. For
On/Off, it's similar, as the app is exited and the calculator suspend.

If you just care about disabling this behaviour, jump below to the
[usage](#usage) section.

## Implementation details

This behaviour is handled by the kernel, so we need to somehow tell the kernel
to disable it. The ideal candidate to do so would be to use the
`SVC_CIRCUIT_BREAKER_LOCK` [SVC call]. Unfortunately, the lock is automatically
disabled with a timer once an event occur, then handle the action. Releasing the
lock is also not possible as the action (exiting the app) is automatically done
when releasing the lock. Disabling the timer also require privileged access, so
an external app isn't able to bypass it.

As no official API is available to disable this unwanted feature, it may seems
impossible at the first look. When looking a bit deeper, the
`SVC_USB_WILL_EXECUTE_DFU` [SVC call] is interesting: when the calculator is in
USB (DFU) mode, pressing the On/Off or Home key won't work. Also, USB seems to
be handled in userland, with the same privileges as external apps.

<!--
TODO: Link with DFU page
TODO: Investigate USB communication through DFU deeper, as it could be
      interesting
-->

When trying to use this method, you will quickly realize that `willExecuteDFU`
also suspend the keyboard (except the Back key), so it kinda break the purpose
of disabling interrupts to get access to On/Off and Home keys.

However, when the calculator is suspended, keyboard is also suspended, then
powered back on when exiting, right? Suspend is also available through a
[SVC call] under the name `SVC_POWER_SUSPEND`. So how about suspending the
calculator after calling `willExecuteDFU` to restore the keyboard?

Eureka! It's working! :tada:

Now, we probably want to restore the calculator into its normal state when
exiting the app. Calling the `SVC_USB_DID_EXECUTE_DFU` [SVC call] is enough.

However, this workaround has some downsides:

- It require suspending the calculator (on Peanut-GB, it's exploited as a
  feature for suspending the calculator without exiting the app, but it's not
  the most ergonomic behaviour for the user, especially when done at the app
  startup)
- It's based on raw SVC calls, which could change on newer Epsilon versions, and
  the implementation of the functions could change (we are relying on
  implementation details).

The downsides are not necessarily blockers so using this workaround is still
useful.

OK, so now that we've found a way to bypass the On/Off and Home keys handling by
the kernel, let's implement it.

## Usage

So, as said in [SVC call], we need to call the SVC functions using the `svc`
assembly instruction. In C, the implementation would look this way:

```c
// Disable On/Off and Home kernel handling
asm("svc 54"); // SVC_USB_WILL_EXECUTE_DFU
asm("svc 44"); // SVC_POWER_SUSPEND

// Do stuff with the On/Off and Home keys

// Restore On/Off and Home kernel handling
asm("svc 51") // SVC_USB_DID_EXECUTE_DFU

// Continue execution with On/Off and Home enabled, or exit the app
```

As you can see, we are just calling the assembly instructions by hand using the
`asm()` C instruction. The implementation is very short, so using it is easy.

You could hide this feature behind an option or button to improve the user
experience (suspending the calculator right after app launch is not the most
intuitive behaviour for users).

[SVC call]: syscalls.md#manual-syscalls
