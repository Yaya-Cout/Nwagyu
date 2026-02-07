# Project creation

## Introduction

This is a step-by-step tutorial for external app creation. At the end of this
tutorial you will have a working snake game with some extra features like high-
score saving or custom maps.

It's intended to be used by anyone wanting to create an external app in the NWA
format. The app will be written in C, so minimal C knowledge will be required,
but Python understanding should be enough to understand the majority of this
book. A text editor and a Linux/WSL installation is recommanded.

You can complete this tutorial by reading the rest of the [documentation](../)
to understand more about the NumWorks external apps.

This page cover a lot of generalities about git usage, which isn't strictly
required for the app (but ease up a lot debugging and code sharing).

## Cloning the app

So, to begin with, we will create a new C app based on NumWorks official
template. For more informations on templates please read the
[Creating your own application](../apps/creating-application.md) page.

We start by installing the dependencies so we won't need to worry about them
anymore: (Linux-only)

```bash
sudo apt install git make gcc-arm-none-eabi npm  # Ubuntu/Debian (choose this one if unsure)
sudo pacman -S git make arm-none-eabi-gcc arm-none-eabi-newlib npm  # Arch Linux
```

On macOS, you can use the following command instead:

```bash
brew install numworks/tap/arm-none-eabi-gcc node
```

Now, let's begin the fun and clone the official template:

```bash
git clone https://github.com/numworks/epsilon-sample-app-c Snake # Clone the source code into the "Snake" folder
cd Snake  # Select the directory inside your terminal
```

## Publishing to a git repository (optional)

Most people (including me) prefer tracking their work in a git repository to
share it to others people and keep an history of work done on a project.

I use [Codeberg](https://codeberg.org/) to host my git repo because I agree with
their political views, but you can use others git providers like Gitlab, GitHub
or Sourcehut if you prefer.

The first step to publish you app is to actually create a git repository on a
server. It is usually quite intuitive. For exemple, on Coderberg you can follow
this [tutorial](https://docs.codeberg.org/getting-started/first-repository/).

At this point, your local git repo is still configured to use NumWorks'
repository (which won't work as you don't have the necessary rights to push your
work there). The first thing to do is to remove it:

```bash
git remote remove origin
```

Now, your local git repository isn't connected to any server. That's the moment
where you need to configure the server you want

```bash
git remote add origin ssh://git@codeberg.org/Yaya-Cout/Snake.git
git branch -m master main # Optional, it renames the default branch from "master" to "main"
git push -u origin main
```

After these commands, my app is available on my own repo: <https://codeberg.org/Yaya-Cout/Snake>
:::

## Fixing templates issues

Unfortunately, NumWorks' own template doesn't work by default, so let's correct
this right now.

The fix is quite simple when you know it, and will allow you to check how to
edit files.

First, you will need a text editor. Any text editor will work (except Notepad on
Windows which will cause problems with newlines). I usually use [VSCodium](https://vscodium.com/)
(a fork of Microsoft [VSCode](https://code.visualstudio.com/) with less AI spam
and less tracking), but you can use any code/raw text editor like [Kate](https://kate-editor.org/)
or [Noepad++](https://notepad-plus-plus.org/downloads/). Vim and Emacs are also
quite good, but less intuitive to use for beginners. You can pick any of them,
we don't need a really sophisticated editor.

Open the project (stored in the `Snake` folder at the location you ran the
`git clone` command at the beginning) in your editor to start working.

The issue is with the default `Makefile` which use an outdated version of
`nwlink` by default, which doesn't work with newer versions of Node.

Open the `Makefile`, and apply the following changes:

```diff
-NWLINK = npx --yes -- nwlink@0.0.16
+NWLINK = npx --yes -- nwlink@0.0.19
```

```diff
-CFLAGS += $(shell $(NWLINK) eadk-cflags)
+CFLAGS += $(shell $(NWLINK) eadk-cflags-device)
```

The first one upgrade `nwlink`, and the second one change one of the calls to
`nwlink` as the syntax changed on the new version.

You app is now ready to run!

## Updating your git repo

This is a (really quick) tutorial about git usage. Some text editors have an
integrated UI for Git, but I will explain basic usage using the command line.

### git add

The first step is to tell git what do you want to publish in the next "commit".

To add our edits on the `Makefile`, the command is quite simple:

```bash
git add Makefile
```

::: details Cancelling git add, Adding only a part of a file

Let's say you added the wrong file and want to cancel this change, git can save
you

```bash
git restore --staged Makefile
```

You are now back to the point before the `git add`.

If you want to only commit some parts of a file, use `git add -p` (if you don't
specify a filename, it will go though all the files of your project)

```bash
git add -p Makefile
```

It will shows the diff for each change, which you can add using "y" or ignore
using "n"
:::

VSCode allows you to do that graphically, press the tree button below the file
button on the sidebar, then press the "+" button along a file

### git commit

The next step is the "commit". When working with git, a commit is a batch of
changes. For example, adding a new feature would be one commit.

When you create a commit, git takes all the changes you previously added and
batch them.

Before committing, you can check what you added using the `git status` command:

```bash
$ git status
Found existing alias for "git status". You should use: "gst"
Alias tip: gst
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   Makefile
```

Each commit should have a short description so you can know afterward what you
do

```bash
git commit -m "[Makefile] Upgrade nwlink to fix app building"
```

This command will create a new commit with a clear description ("\[Makefile\]
Upgrade nwlink to fix app building")

::: details Editing a commit, and removing a commit

Warning: **Don't edit or delete commits after running `git push`**, otherwise
you will have to use `git push --force` which will break other people's clones.
Data previously committed will usually still be available on the server, if
people know the commit hash.

This being said, if you forgot to add a file or made a typo in a commit before
running `git push`, you can edit the last commit using the `--amend` flag.

Just `git add` any missing file then use the following command:

```bash
git commit --amend -m "[Makefile] Upgrade nwlink to fix app building"
```

You can also alter the commit message this way.

If you want to cancel the last commit, use `git reset`:

```bash
git reset HEAD~1
```

The commit will now be canceled and files will need to be added again.
:::

### git push

Once you are ready to publish your changes on the server, use the `git push`
command to make them available:

```bash
git push
```

Your changes are now publicly available.

## Running the app

Having the source code of your app is fun. Having it on a server is more
fun. But having it on you calculator is even more fun, so let's run the app!

Plug your calculator on you computer, ensure NumWorks' website is closed
(otherwise connection to the calculator will fail) then use the following
command:

```bash
make run
```

::: details Usb device selection failure: Error: requestDevice error: no devices found
On Windows with WSL, the USB doesn't work out-of-the-box.

You can get it to work using `usbipd` ([Microsoft tutorial](https://learn.microsoft.com/en-us/windows/wsl/connect-usb)), or directly use the NWA file (see the next section).
:::

The calculator will show the "THIRD PARTY APPLICATIONS" screen, just press OK.

Scroll at the bottom of the home screen, and run your app (called App with a
C logo). You are now running your own app! :tada:

For now the app will show a text for 3 seconds, then switch to a screen with
random rectangles and one square you can move around the screen, it's the
template.

We will actually start coding the app on next section.

## Getting a NWA file

Having you app on your calculator is great, but how to distribute it? That's
where `nwa` files enter the game (they are just special `ELF` files, in the same
format as a computer app).

To build them, use this simple command (`make run` also create a NWA file, but
it's not the official way to generate one):

```bash
make
```

Then, navigate to the `output` folder in your app directory, and a `app.nwa`
will now have appeared. This file can be installed like any app on
[NumWorks App installer](https://my.numworks.com/apps).

The template requires external data, don't worry too much about it, just give it
the `src/input.txt` file then install the app (we will remove this requirement
on the next page).

If you managed to run the app, let's go on to the real app creation!
