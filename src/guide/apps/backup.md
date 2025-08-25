# Backup

This app allows transmitting the storage of your NumWorks calculator using QR
Codes, without any wire involved, for example to quickly backup from a
smartphone.

## How to use the app

When you open this app, you need to choose between 4 modes. The three first ones
are the actual transfer presets, ordered from the fastest to the slowest. The
fourth one is a shortcut to open the scanner website on a smartphone.

Select a transfer mode inside the menu (using the arrows and OK/EXE, or the
digits keys), then scan the QR Codes using
[Upsilon Workshop](https://yaya-cout.github.io/Upsilon-Workshop/calculator?qr=1).

Once the transfer is finished, the website should start downloading a zip file
containing a backup of all the calculator files, with Python scripts and binary
files (such as emulators saves).

To restore this backup, you can use the "+" button on the "calculator" page of
Upsilon Workshop after connecting your calculator using USB. You can also use
[NumWorks Connector] to upload the zip.

::: note
Upsilon Workshop doesn't currently support restoring binary files
(emulators saves). If you need to restore them, use [NumWorks Connector].
Backing up binary files with QR Codes using Upsilon Workshop is supported (only
restauration isn't implemented).
:::

::: tip
You don't need any account for any feature of this app. Upsilon Workshop only
require an account to create/edit projects online.
:::

## Download

You can download the Backup app from this link:

- [Backup v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/backup-1.0.0.nwa)

## Installation

To install the Backup app, follow the instructions in the
[how to install](../help/how-to-install.md) guide.

## Source code

Source code for Backup is available
[here](https://codeberg.org/Yaya-Cout/Backup).

[NumWorks Connector]: https://yaya-cout.github.io/Numworks-connector/#/
