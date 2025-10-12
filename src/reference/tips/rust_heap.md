# [Rust] Using a heap allocator when developing apps

When you develop NWA applications in Rust, you have to use the `#[no_std]` flag to avoid using system dependencies. This is called embedded programming. But with embedded programming in Rust, this flag disables the default global allocator, which means : no Vec, no Strings and no dynamic allocations in general. When you program nwa apps using C, you can rely on the [implementation of `_sbrk`](https://github.com/numworks/epsilon/blob/9072ab80a16d4c15222699f73896282a65eecd54/eadk/src/platform.c#L18) provided by eadk which allows a seamless use of malloc. But here, we are in Rust, so there is no malloc and no `_sbrk`. So how can we achieve dynamic allocation ?

## Use third party allocators

There are plenty of third party allocators available on [crates.io](https://crates.io/) and some are exclusively made for embedded environments. The main one is called `embedded_alloc`. This allocator is very efficient on embedded devices.

In order to init `embedded_alloc`, you need to know the start and the size of the heap. You can get this information by getting a pointer to the `_heap_start` and `_heap_end` symbols provided at compile time.

::: info Oh wow! Calm down rusticians. I know that unsafe Rust is bad and that I deserve to go to the jail for doing unsafe Rust. But remember that we are on an embedded device and that creating an allocator is, by definition, unsafe rust.
:::

::: info Actually, the pointer to `_heap_end` seems to be broken and the address to `_heap_end` seems to point outside of the heap. `&_heap_end - &_heap_start` gives a heap size of 140 KB but in fact, the heap seems to be limited to 100 KB so writing more than 100 KB will crash the calculator. Knowing that, you should hardcode the size of the heap to avoid having undefined behaviors.
:::


## Init the heap allocator
That being said, let's begin writing some Rust code!

Firstly, you need to declare the `_heap_start` symbol in `eadk.rs`. To do so, you can simply add this at the end of the file :
```rust
unsafe extern "C" {
    pub static mut _heap_start: u8;
}

pub static mut HEAP_START: *mut u8 = core::ptr::addr_of_mut!(_heap_start);
```

Now that we know where the heap starts, let's go back to the allocator.

To install `embedded-alloc`, run `cargo add embedded-alloc` in your project's directory. But embedded alloc needs a critical section implementation. We can resolve this dependency by installing the `cortex-m` crate.

To do so, add the following line in the dependencies in your `Cargo.toml`:

```toml
cortex-m = {version="*", features=["critical-section-single-core"]}
```
And replace the `*` with the latest version. See the [`cortex-m` crates.io page](https://crates.io/crates/cortex-m).

You can now go back to your main.rs file and init the heap allocator.

In order to be able to use the `alloc` crate, you have to declare it. Next import `eadk::heap_size`, `cortex_m` and `embedded_alloc::LlffHeap`. The `cortex-m` crate will be shown as unused, but it must be imported for the heap to work properly.

```rust
#![no_std]
#![no_main] // Required by no_std

#[allow(unused_imports)]
use cortex_m;

use eadk::heap_size;
use embedded_alloc::LlffHeap as Heap;
extern crate alloc;
```

Now you can define the global heap with the `#[global_allocator]` flag. It has to be static.
```rust
#[global_allocator]
static HEAP: Heap = Heap::empty();
```

The last thing we have to do to finish initializing the heap is to... initialize it.

**Warning: unsafe Rust incoming**

The initialization must be the first thing that is called in your program to prevent potential issues.
```rust
#[unsafe(no_mangle)] // Required by no_main
fn main() {
    {
        let heap_size: usize = 80_000; // Set the maximum heap size you want
        unsafe { HEAP.init(eadk::HEAP_START as usize, heap_size) }
    }

    // More code here
}
```

And here we are! We have a fully featured global allocator in Rust!

## Use the allocator

This allocator is the same as the std allocator with one exception: we don't have `std`. So instead of using the `std` crate, you have to use the `alloc` crate.

So, each time you want to use the allocator, use
```rust
use alloc::vec::Vec;
```
Here, `Vec` is an example, but it also works with `format!()` or even `String`.

I highly encourage you to check the [documentation for `embedded-alloc`](https://docs.rs/embedded-alloc/0.6.0/embedded_alloc/).