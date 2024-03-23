# KhiCAS

KhiCAS is a [CAS](https://en.wikipedia.org/wiki/Computer_algebra_system)
(Computer Algebra System) that can solve equations and do advanced calculations.

There is not a lot of documentation about KhiCAS, and it is not very
user-friendly, but it is still a very powerful tool. If you want to learn more
about KhiCAS, you can read some [documentation](#documentation)

## Download

::: danger
This version is no longer maintained and shouldn't be used anymore. It crash
often and lack many features.

You should use the [new version] instead.
:::

You can download the KhiCAS app from this link: (choose the one corresponding
to your calculator version, written on the back of your calculator)

- [KhiCAS N0110 and N0115](https://yaya-cout.github.io/Nwagyu/assets/apps/khicas.nwa)
- [KhiCAS N0120](https://yaya-cout.github.io/Nwagyu/assets/apps/khicas-n0120.nwa)

<!-- The N0120 version is slightly modified, see :
https://github.com/nwagyu/khicas/issues/2

To resume, change the stackptr in gen.cc from 0x20036000 to 0xffffffff
-->

## Documentation

As KhiCAS is very powerful, you need to know which command to use.

First, this version have some limitations compared to others version of KhiCAS
for NumWorks (because of NumWorks limitations) :

- You can't save your session (supported in the [new version])
- Crash very often (when using power `^` for example, fixed in the [new version])
- **To access the menu, you have to use Shift + EXE instead of Home**,

There is a lot of different sources to learn how to use KhiCAS :

- A [short documentation](https://github.com/Yaya-Cout/KhiCAS_guide/blob/626b9786ff19504152628cfa42447c87ab73f648/KhiCAS_guide.pdf),
  in french with illustrations, should be easy to start using KhiCAS
  (recommended for beginners)
- The [great video of Schraf](https://www.youtube.com/watch?v=wykeOAVYMFI) to
  learn KhiCAS
- The [official website](https://www-fourier.univ-grenoble-alpes.fr/~parisse/numworks/khicasnw.html),
  which is very complete

You can also search for documentation for [Giac/Xcas](https://xcas.univ-grenoble-alpes.fr/),
the desktop version of KhiCAS.

## Installation

To install KhiCAS, follow the instructions in the
[how to install](../help/how-to-install.md) guide.

[new version]: ../khicas.md
