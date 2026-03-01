# Part 14: Conclusion

You've reached the end of this tutorial, congratulations! :tada:

I don't pretend my solution is the best implementation possible, it's just one
way which is working. For example, some people would have used real constants
declared using `const` instead of preprocessor macros declared with `#define`.
The main goal of this tutorial is to help you learn C and how NWA apps works
behind the scenes.

As you can see, this game is playable but can still be improved. If you need
some ideas of possibles improvements, you can try doing the following:

- Improving the interface, by adding a title screen with a logo and a better
  game over screen with a retry option
- Adding some difficulty presets on the title screen, controlling speed and
  fruit spawn rate
- Creating new maps, and why not a map editor with user maps stored in the
  Python storage using `storage.c`
- Built-in maps with a map chooser, to avoid needing to install the app many
  times to use several maps
- Autoplay move, where the snake move by itself. You can try an algorithmic
  approach, or a machine-learning approach where the snake learns over time.
  I've made an implementation on my [q-learning branch](https://codeberg.org/Yaya-Cout/Snake/src/branch/q-learning).
- Randomly spawning obstacles, and maybe a way to interact with them
- [Releasing](../apps/creating-application.md#adding-your-app-to-nwagyu) your
  app on Nwagyu
- Creating another app
- And of course whatever you want to implement, it's your game after all

The code you should have if you followed the tutorial is available here:
<https://codeberg.org/Yaya-Cout/Snake/>

If you need help, simply want to send me a message or want to show your
creations, don't hesitate to open an issue on the [Nwagyu GitHub repo] or
[Snake Codeberg repo], join our [Discord server], send me a message on [Matrix]
(we don't have a NumWorks room yet), by email (I won't write it here to avoid
bots) or on the Fediverse at [@yayacout@social.linux.pizza](https://social.linux.pizza/@yayacout).

A final note: have fun!

[Nwagyu GitHub repo]: https://github.com/Yaya-Cout/Nwagyu/issues
[Snake Codeberg repo]: https://codeberg.org/Yaya-Cout/Snake/issues
[Discord server]: https://discord.gg/omega-community-663420259851567114
[Matrix]: https://matrix.to/#/@yaya.cout:tchncs.de
