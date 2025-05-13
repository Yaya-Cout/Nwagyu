# Compressor

This app is a file compressor that runs on the NumWorks calculator. It allows
you to compress your files on-calc, without needing a computer, with compression
ratios around 2. It allows you to store twice the files you could have stored
without!

## How to use the app

When you open this app, you need to choose between two mode, which are
complementary: compress and decompress

### Compressing a file

To compress a file, press the `1` button on the calculator.

Then, you will find a file selector, just select the file you want to compress
using the `up` and `down` keys before pressing OK or EXE.

If everything worked fine, the app should exit almost immediately. Otherwise,
check the [troubleshooting](#troubleshooting) section.

If you want to access the compressed file again, read the next section to
decompress it.

### Decompressing

To compress a file, press the `2` button on the calculator.

Then, you will find a file selector, just select the file you want to decompress
using the `up` and `down` keys before pressing OK or EXE. Your file will have
the `.pylz4` extension.

If everything worked fine, the app should exit almost immediately, and your file
will be available again, as if it had never been compressed. Otherwise, check
the [troubleshooting](#troubleshooting) section.

## Download

You can download the Compressor app from this link:

- [Compressor v1.0.1](https://yaya-cout.github.io/Nwagyu/assets/apps/compressor-1.0.1.nwa);
  fix crashs and bugs when storage is full
- [Compressor v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/compressor-1.0.0.nwa)

## Installation

To install the Compressor app, follow the instructions in the
[how to install](../help/how-to-install.md) guide.

## Troubleshooting

Here are solutions to some common problems you can encounter with this app

### Error: Storage is full

You don't have enough free space to store the new file. This should mainly
happen when decompressing files. In this case, try to compress or delete other
files before retrying.

This error also show required free space and current free space to help you to
visualize how much memory you need to free.

Note that you can't delete compressed files without decompressing them for now
without a computer, see [#2](https://codeberg.org/Yaya-Cout/Compressor/issues/2).

### Error: Couldn't write file

You don't have enough free space to store the new file. This should never happen
as you would get `Error: Storage is full` instead. If you get this error, the
file is definitely lost.

In this case, please open an [issue](https://codeberg.org/Yaya-Cout/Compressor/issues)
to investigate this case.

### Error: Output file already exists

This error means the output file is already created.

When compressing, it means you already have a compressed file with the same
name. In this case, rename the file you want to compress from the Python app and
retry.

When decompressing, it means you already have a decompressed file with the same
name. In this case, rename the already exiting file from the Python app and
retry.

### Error: Compression/Decompression failed

This error shouldn't happen in most case.

If you get this error during compressing, it means the compressed file is more
than 10 bytes bigger than the source file, in which case compressing the file
is useless anyway.

If you get this error during decompressing, it means that your uncompressed file
is bigger than 60KB, bigger than the current storage size on locked NumWorks.

This error can also means that the compressed file is invalid, which shouldn't
happen unless you are editing the file using another way. When I'm writing this
app, no such tool exist without a computer so it shouldn't be a problem.

### Compressing other files than Python

Compressing other files than Python scripts is not implemented as there would be
near-zero benefit to it.

Here are the files present on the NumWorks:

- Internal files (settings, calculation variables, functions, equations…) which
  are often useful and lightweight, and wouldn't benefit much from compression
- Emulator saves, which are already compressed by default using the same
  algorithm as this app
- KhiCAS sessions, not implemented as not really widespread, with most people
  only using one session, which would need to be compressed/decompressed on each
  KhiCAS launch. It would better be implemented internally to KhiCAS, like
  emulators saves

We also need to keep the file list clean for easy navigation.

### Access from computer

To manage compressed files from a computer, you can use any tool that can
display the calculator files, including non-Python ones, like

- [Upsilon Workshop](https://yaya-cout.github.io/Upsilon-Workshop/calculator)
  (only removing and rename, no compressed file downloading)
- [NumWorks Connector](https://yaya-cout.github.io/Numworks-connector/#/),
  handling everything, including rename, deletion, backup and uploading without
  any account

Note that, for now, none of these tools allow transparent decompression.

Compressed files *should* be decompressibles using LZ4 on a computer, but I
didn't actually test.

## Source code

Source code for Compressor is available
[here](https://codeberg.org/Yaya-Cout/Compressor).
