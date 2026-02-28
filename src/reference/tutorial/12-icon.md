# Part 12: App icon

The final touch that we should have done earlier is adding an icon. In a
NumWorks app, it's quite easy to do: the icon is just a 55×56 PNG file, located
in `src/icon.png`. You can use any tool you want to create it.

## Designing the icon

The most complicated part of the icon is creating it. For the purpose of this
tutorial, I will use [Inkscape](https://inkscape.org/), one of the best SVG
editor, which I use for almost everything (I still use GIMP for raster image
edition, but not for from scratch creation).

Note that creating or reprocessing the icon on GIMP can sometimes leads to
better results if you want to avoid blurry edges on your icon.

### NumWorks color palette

If you want to make an Epsilon-style icon (similar to the native apps icons),
you will need to use a similar color palette. Here are the main colors used by
the icons:

| Color   | Name            | Usage                                        |
| ------- | --------------- | -------------------------------------------- |
| #FFFFFF | Corners         | Creating the corners around the icon         |
| #D9D9D9 | Border          | Used below the icon as a shadow              |
| #1D1E21 | Dark border     | Used below the icon as a shadow (dark icons) |
| #F5F5F5 | Background fill | Fill empty spaces inside the icon            |
| #3E3F45 | Primary         | Used to draw main shapes, softer then black  |
| #636976 | Secondary       | Draw less important shapes                   |
| #FFB81B | Main fill       | Fill the most important shape                |
| #FFCD77 | Secondary fill  | Used as a top shadow in some icons           |

Note that some native apps (e.g. Distributions) invert background and foreground
colors, probably to create style variations improving diversity.

Some used colors aren't in this palette, like the Settings icon which use pure
white for the sliders, and another kind of grey for the background.

Be careful with reusing NumWorks branding, as they may not be happy with people
doing so. Most icons were available in [Epsilon 15](https://github.com/numworks/epsilon/tree/version-15?tab=readme-ov-file),
which was released under a [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en)
license, so as long as you tell you reused NumWorks' graphical chart, and don't
sell your work, you should be fine. However, I'm not a lawyer, and this license
isn't compatible with most FOSS licenses (like GPL), so I'm not responsible for
anything you do based on these colors.

::: details Upsilon color palette

[Upsilon](https://getupsilon.web.app/), an alternative firmware, use a simpler
color palette

| Color   | Name            | Usage                                       |
| ------- | --------------- | ------------------------------------------- |
| #FFFFFF | Corners         | Creating the corners around the icon        |
| #E6E6E6 | Border          | Used around the icon instead of a shadow    |
| #F2F2F2 | Background fill | Fill empty spaces inside the icon           |
| #7EA2CE | Primary         | Used to draw main shapes, softer then black |
| #4A4A4A | Secondary       | Draw less important shapes                  |

A border around the icon is used in spite of the bottom shadow used by Epsilon,
creating another style

:::

### NumWorks icons design

Most native icons have a 1 pixel shadow at the bottom, creating depth, as if the
icon was above the white background, which can be tricky to replicate,
especially on darker icons, but is an important part of the final icon.

Older icons used a 3-step gradient in the background, but newer icons seems to
prefer a flat background. You can find this on the Grapher, Sequences and
Regression icons.

### Templates

I won't do a design tutorial, as I'm really bad at design. If you want, here
are templates of Upsilon icons and Epsilon (aka native) icons:

![Epsilon](./12-epsilon-icon.svg)

![Upsilon](./12-upsilon-icon.svg)

I used a small trick to transform the border around the icon into a shadow on
the Epsilon version by adding a gradient.

A small tip in case you are lacking ideas for your icon: use [SVG Repo](https://www.svgrepo.com/),
a website containing open-licensed SVG icons. You don't have to directly reuse
icons, but reusing some ideas can be helpful.

### Snake icon

Based on what I previously explained and this [SVG Repo icon](https://www.svgrepo.com/svg/108845/snake-facing-right),
I created an icon for our app. It's not really perfect, but it will be better
than our current icon.

![Snake icon](./12-snake-icon.svg)

The next step is exporting the icon as PNG. In Inkscape, press File → Export
(or Shift+Ctrl+E), which will open the export panel. Ensure size is 55×56px,
check the output filename then press Export.

In case you are following this tutorial and don't want to use Inkscape, here's
the exported PNG icon link: [icon](./12-snake-icon.png).

## Adding it to the app

This is quite easy: just replace the `src/icon.png` file in your app by the
exported icon.

Then, simply running `make run` will be enough to install the app with your new
icon on your calculator.

## Renaming the generated NWA file

While we are doing branding, we can also change the filename of our app when
building it, instead of the default `app.nwa`. Of course a simple rename will be
enough, but having a clear filename by default can be useful.

To do so, simply replace all references to `app.nwa` or `app.bin` by `snake.nwa`
and `snake.bin`, and we're done.

Don't forget to commit your work!

Next time we will increase difficulty over time and some other minor
improvements.
