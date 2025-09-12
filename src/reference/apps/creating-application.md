# Creating your own application

On this page, you will learn how to create your very own application.

## Target operating system

Before building your application, you need to decide which operating system you
want to target, as Epsilon's system (NWA) is not the same format as the one used
by Omega/Upsilon

### Differences between Omega/Upsilon and Epsilon

#### Upsilon and Omega (extapp)

Historically, external apps were only available on Omega (Upsilon didn't exist
back to the time). Omega API was originally designed for running KhiCAS, but
quickly evolved into a full-fledged external apps system.

Omega external apps stay during exam mode, run faster based on my benchmarks and
their behaviour is often known by the community.

Upsilon was later forked from Omega after Epsilon 16 was released as Omega
maintainers didn't wanted to fight against NumWorks in a cat-and-mouse game.
Khi also appeared as another fork of Omega created by Bernard Parisse, KhiCAS
and xcas developer. He added several features to the external apps API, notably
the ability to write flash.
Upsilon continued adding new features to Omega, including merging back Khi
improvements.

`extapp` is the prefix used by the external apps API on Omega, hence the name.

Documentation about Omega/Upsilon (extapp) is available on
[Upsilon-External](https://github.com/UpsilonNumworks/Upsilon-External/blob/master/docs/new-app.md)
repo

#### Epsilon (NWA/EADK)

Epsilon 16 (the first locked Epsilon version) released the NWA external apps
system to redeem themselves from the community as they removed all the freedom
from NumWorks calculators.

However, their system only allow a restricted set of feature compared to Omega.
Here are the keys differences:

- External apps are not available on exam mode
- External apps are deleted when reseting the calculator, including crashes
- Storage access is not officially supported (but an unofficial
  reimplementation exists, see [Accessing storage])
- Only NumWorks has the control over the API, so extending it is not always
  possible (disabling [On/Off and Home keys], for example)
  <!-- TODO: Link to the page -->

EADK is the name given by NumWorks to the API used by NWA applications.

## Creating an Upsilon application

Documentation about Omega/Upsilon (extapp) is available on
[Upsilon-External](https://github.com/UpsilonNumworks/Upsilon-External/blob/master/docs/new-app.md)
repo

Upsilon application are mostly backward-compatible with Omega if you don't use
Upsilon-specific API, but there is no real reason to use Omega instead of
Upsilon anyway.

## Creating a NWA/EADK application

### Choosing a programming language

NWA apps are written in compiled languages, so C, C++, Rust and Zig.

C and C++ are very similar, the main difference between C and C++ is that C++ is
object-oriented, with class support, allowing easier and more organized code.
C syntax is also usable on C++, so unless you have a very specific reason to not
use C++, C++ is preferable.

Rust is a modern memory-safe language, saving a lot of time during debugging
with performance comparable to C/C++. Rust also feature a library ecosystem to
avoid reimplementing the wheel.

### Creating your app

::: tabs
@tab C
NumWorks is providing a C application template on the GitHub repo
[numworks/epsilon-sample-app-c](https://github.com/numworks/epsilon-sample-app-c)

To use it, follow the instructions on the README.

Instructions to install the toolchain (choose the one corresponding to your
Linux distribution, or adapt the commands if it's not listed):

```bash
sudo apt install git make gcc-arm-none-eabi npm # Ubuntu/Debian
sudo pacman -S git make arm-none-eabi-gcc arm-none-eabi-newlib npm # Arch Linux
```

Here is a quick guide about it, assuming the toolchain is already installed:

```bash
git clone https://github.com/numworks/epsilon-sample-app-c
cd epsilon-sample-app-c

# To build and install the app on you calculator directly.
make run

# To simply build your app
make # make build for the full command

# To clean the build cache in case of inconsistent cache
make clean
```

If you get an error like this, it means that you are using a too recent Node
version. You can downgrade Node, or upgrade `nwlink` (see below).

```output
CC      src/main.c
src/main.c:1:10: fatal error: eadk.h: No such file or directory
    1 | #include <eadk.h>
      |          ^~~~~~~~
compilation terminated.
```

The nwa file is located under `output/app.nwa`, and is ready to be flashed from
NumWorks website just as any normal external app.

@tab C++
NumWorks is providing a C++ application template on the GitHub repo
[numworks/epsilon-sample-app-cpp](https://github.com/numworks/epsilon-sample-app-cpp)

To use it, follow the instructions on the README.

Instructions to install the toolchain (choose the one corresponding to your
Linux distribution, or adapt the commands if it's not listed):

```bash
sudo apt install git make gcc-arm-none-eabi npm # Ubuntu/Debian
sudo pacman -S git make arm-none-eabi-gcc arm-none-eabi-newlib npm # Arch Linux
```

Here is a quick guide about it, assuming the toolchain is already installed:

```bash
git clone https://github.com/numworks/epsilon-sample-app-cpp
cd epsilon-sample-app-cpp

# To build and install the app on you calculator directly.
make run

# To simply build your app
make # make build for the full command

# To clean the build cache in case of inconsistent cache
make clean
```

If you get an error like this, it means that you are using a too recent Node
version. You can downgrade Node, or upgrade `nwlink` (see below).

```output
CC      src/main.c
src/main.c:1:10: fatal error: eadk.h: No such file or directory
    1 | #include <eadk.h>
      |          ^~~~~~~~
compilation terminated.
```

The nwa file is located under `output/voord.nwa`, and is ready to be flashed
from NumWorks website just as any normal external app.

@tab Rust
NumWorks is providing a Rust application template on the GitHub repo
[numworks/epsilon-sample-app-rust](https://github.com/numworks/epsilon-sample-app-rust)

To use it, follow the instructions on the README.

To install the toolchain, simply install the toolchain using
[rustup](https://rustup.rs/) or your distributions packages.

You also need Node installed with Nwlink

For example, you can install it this way on Ubuntu (but it shouldn't be very
different on other Linux distributions like Arch Linux)

```bash
sudo apt install git rustup gcc npm
npm install -g nwlink
rustup default stable
rustup target add thumbv7em-none-eabihf
```

Here is a quick guide about it, assuming the toolchain is already installed:
<!-- TODO: Toolchain installation -->

```bash
git clone https://github.com/numworks/epsilon-sample-app-rust
cd epsilon-sample-app-rust

# To build and install the app on your calculator directly.
cargo run

# To simply build your app
cargo build

# To clean the build cache in case of inconsistent cache
cargo clean
```

The nwa file is located under
`target/thumbv7em-none-eabihf/debug/epsilon-sample-app`, and is ready to be
flashed from NumWorks website just as any normal external app.

@tab Zig

No *official* template for Zig is available, but there is a template made by the
community: [epsilon-sample-app-zig](https://github.com/Sietse2202/epsilon-sample-app-zig).

To use it, follow the instructions on the README.

To install the toolchain, simply install the toolchain using
[zig](https://ziglang.org/download/) or your distributions packages.

Here is a quick guide about it, assuming the toolchain is already installed:
<!-- TODO: Toolchain installation -->

```bash
git clone https://github.com/Sietse2202/epsilon-sample-app-zig
cd epsilon-sample-app-zig

# To build and install the app on your calculator directly.
zig build install-nwa

# To simply build your app
zig build nwa
```

The nwa file is located under
`zig-out/bin`, and is ready to be
flashed from NumWorks website just as any normal external app.
:::

::: details Upgrading `nwlink`
Unfortunately, the NumWorks template is using an outdated `nwlink` version which
doesn't support newer Node versions.

To upgrade it, change the `NWLINK` definition in the Makefile to use at least
version 0.0.19

```makefile
NWLINK = npx --yes -- nwlink@0.0.19
```

Then, as the syntax changed, replace `eadk-cflags` with `eadk-cflags-device`

```makefile
CFLAGS += $(shell $(NWLINK) eadk-cflags-device)
```

After changing these 2 lines, you are ready to go with the newer nwlink version!
:::

Now you have built and flashed your app, you can play with the API and read the
rest of the documentation to learn things you can do.

## Adding your app to Nwagyu

To add your app to Nwagyu, you can either send a pull request to the
[repo](https://github.com/Yaya-Cout/Nwagyu) of this website, or send us directly
your app (preferably with source code available) to get it added to the website

Here are the steps to follow:

1. Fork the repository
2. Add you app to `src/.vuepress/public/assets/apps/appname-X.Y.Z.nwa`
3. Create a page for your app in `src/guide/apps/appname.md` with the same
   structure as other pages.
4. Reference you app in `src/guide/README.md` and `src/guide/apps/README.md`
5. Repeat all the steps for the french translations by replacing `src/guide` by
   `src/fr/guide` in paths.
6. Add your app to the navbar inside `src/.vuepress/config.js`, in the
   `children` list (you need to do it twice, for both french and english)
7. Open a pull request to add your app

If you can't do the french translation, it's not a big deal, but we will need to
add it before merging (out of sync translations is really bad, as syncing
everything will take time).

[Accessing storage]: storage.md
[On/Off and Home keys]: onoff-home.md
