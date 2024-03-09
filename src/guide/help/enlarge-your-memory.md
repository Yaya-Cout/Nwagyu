# Enlarge your memory!

Normally the NumWorks calculator only lets you use around 2.5MB to install apps. But thanks to Nwagra, you’ll be able to use up to 6MB!

## Nwagra setup

1. Drag and drop the following link to your bookmarks bar:
   <!-- TODO: Try to see if we can use a markdown link here -->
   <a href="javascript:(function()%7B!function()%7Blet%20t%3Ddocument.createElement(%22script%22)%3Bt.type%3D%22text%2Fjavascript%22%2Ct.src%3D%22https%3A%2F%2Fyaya-cout.github.io%2FNwagyu%2Fnwagra.min.js%22%2Cdocument.head.appendChild(t)%7D()%3B%7D)()%3B">Nwagra</a>
2. Go on [NumWorks’s website](https://my.numworks.com/devices/upgrade) and update your
   calculator
3. Update your calculator again. Yes, you need to update it twice.

## Using Nwagra

1. Go to [NumWorks’ app loader](https://my.numworks.com/apps)
2. Click the “Nwagra” bookmarklet. The page’s title should now say “Enlarged Extra Apps”.
3. You’re good to go, you now can use more space to install NWA apps!

## What if it doesn’t work?

If it’s not working, make sure that:

- You are using Google Chrome or another Chromium-based browser with WebUSB
  support
- You have updated your calculator twice
- You unplugged your calculator before going to NumWorks’ app loader and
  clicking the Nwagra bookmarklet

## About Nwagra

### Does this really enlarge my calculator’s memory?

You wish!

### How does it work?

The NumWorks calculator contains two copies of its operating system. Why? To make the update procedure more reliable. When you update your calculator, you’re not overwriting your calculator’s OS: instead, you’re adding a newer OS right next to the current one. This way, if you mess up the update procedure, the previous OS is still present and your calculator, even if not up-to-date, is still working properly.

Now this means that most of the time more than half of the calculator’s available memory is wasted on an unused copy of the OS. Nwagra lets you overwrite the second copy of the OS with custom apps.

### Will this damage my calculator?

Normally this shouldn’t have any impact. If for some reason your first OS copy suddenly becomes corrupted, then you’ll indeed need to reinstall your calculator’s OS.

### How does the bookmarklet work?

The NumWorks OS contains a special marker that tells which part of the Flash memory can be used to install external apps. NumWorks’ app loader website reads this marker over USB to figure out where to install apps. The bookmarklet simply patches the WebUSB calls that NumWorks’ app loader is making and reports more useable space.

### Is it a joke ?

No, it's not a joke. It really work. It's just breaking limitations on NumWorks
site.
