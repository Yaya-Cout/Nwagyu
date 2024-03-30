# KhiCAS

KhiCAS is a [CAS](https://en.wikipedia.org/wiki/Computer_algebra_system)
(Computer Algebra System) that can solve equations and do advanced calculations.

There is not a lot of documentation about KhiCAS, and it is not very
user-friendly, but it is still a very powerful tool. If you want to learn more
about KhiCAS, you can read some [documentation](#documentation).

::: tip
If you just want to install, jump to the [installation](#installation) section
:::

## Documentation

As KhiCAS is very powerful, you need to know which command to use.

There are a lot of different sources to learn how to use KhiCAS :

- A [short documentation](https://github.com/Yaya-Cout/KhiCAS_guide/blob/626b9786ff19504152628cfa42447c87ab73f648/KhiCAS_guide.pdf)
  in French with illustrations, should be easy to start using KhiCAS
  (recommended for beginners)
- The [great video of Schraf](https://www.youtube.com/watch?v=wykeOAVYMFI) to
  learn KhiCAS
- The [official website](https://www-fourier.univ-grenoble-alpes.fr/~parisse/numworks/khicasnw.html)
  which is very complete

You can also search for documentation for [Giac/Xcas](https://xcas.univ-grenoble-alpes.fr/)
the desktop version of KhiCAS.
As KhiCAS is available on many calculators, you can also try to follow tutorials
for others calculators.

## Limitations

This version has some limitations compared to others version of KhiCAS
for NumWorks (because of NumWorks limitations) :

- **To access the menu, you have to use Shift + EXE instead of Home**
- The launcher need to be reflashed on each reset/crash (please comment here
  to protest against this arbitrary limitation : <https://github.com/numworks/epsilon/issues/2167>
  This limitation has no reason to exist because others (more expensive)
  calculators allow it, sometimes even natively !)
- KhiCAS is not allowed in exam mode, even if it is allowed to (at least) french
  exams. (I'm not a lawyer, it's just informative)

## Installation

Because of NumWorks limitations, KhiCAS need to be flashed with a special way as
a workaround for NumWorks external app system.

More information can be found [here (in French)](https://xcas.univ-grenoble-alpes.fr/nw/nws.html)
(you need to go in the installation section at `Installation Numworks N0110 verrouillée, N0115/N0120`).

::: warning
This version is the most complete version that exist for locked calculators, and
is more stable than others.

However, it's (when I wrote this) still a beta, so some crashes can be
excepted (but should not happen).

It you encounter a crash, please report it. For example, you can report in
[on TI-Planet](https://tiplanet.org/forum/viewtopic.php?t=26601) or
on the [GitHub repo of this website](https://github.com/Yaya-Cout/Nwagyu/issues). (I
will redirect it)
:::

## Legacy version

The old KhiCAS port can be found [here](./legacy/khicas.md), but you shouldn't
use it unless you need it for a specific reason.
