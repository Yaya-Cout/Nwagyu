# Downloading Epsilon from NumWorks' website

Epsilon source code is partially available, with restrictions (strong copyright,
e.g. with limited rights about redistributions) at [numworks/epsilon] on GitHub.

You can run it using the [build instructions] they give on their website, with
all the [restrictions about custom firmwares](../firmware/userland.md#loading-custom-userland).

If you want the full binary with kernel and bootloader, you need to get it from
NumWorks website as they're signed and source isn't even available. Here are the
requirements:

- A NumWorks account (downloading won't work without it)
- An internet connection
- Knowing the model name for which you want the firmware

::: note
Everything described on this page is purely educative content and not intended
for use, please review NumWorks Terms of Use before doing so. I'm not
responsible for anything you do.
:::

## Download options

You can find the models by reading the source code of their website (it's not
really obfuscated) or simply guessing from the model names. Here is a list of
the models we know:

- `n0100`
- `n0110`
- `n0115`
- `n0120`
- `N0120_PORTUGAL_PROTOTYPE_20210930`

Additionally, you can choose to download either the stable or beta version,
named `stable` and `beta`.

## Downloading

To download, first log in to NumWorks website as usual (you aren't required to
use a browser with WebUSB support, Firefox works fine). Once you are logged in,
simply open `https://my.numworks.com/firmwares/$MODEL/$VERSION.dfu`, replacing
the values with the version you want, and save the file.

For example, to download the release for stable N0110, you would download from
<https://my.numworks.com/firmwares/n0110/stable.dfu>.

If you get an error "401. Unauthorized.", make sure you are logged into your
account.

Note that account cookies doesn't expire (my 2 years ago cookie still works), so
it's perfectly fine to pass them as simple headers in curl.

## Version info

When scripting and bulk downloading from the website, it can be useful get a few
metadata. You can do so using 2 different ways:

- [Extracting metadata from the binary](../firmware/addresses-structures.md) by
  hand
- Downloading metadata from NumWorks website, avoiding implementing more complex
  extraction, and can be done before downloading the binary

On this page, we'll cover the second way, downloading from their website. The
syntax is similar to binary download, simply replacing `.dfu` with `.json`:
`https://my.numworks.com/firmwares/$MODEL/$VERSION.json`

For stable N0110, you get `https://my.numworks.com/firmwares/n0110/stable.json`.
At the time of writing, the reply is (formatted for easier reading):

```json
{
  "id": 239,
  "version": "23.2.6",
  "patch_level": "22d1daa",
  "device_model": {
    "id": 2,
    "name": "N0110",
    "extension": "dfu"
  },
  "size": 3371357
}
```

## Extracting internal and external flash

DFU files often need to be extracted before use (Upsilon Website can extract and
flash DFU files, but it's not the case of most apps).

I don't have the time to rewrite a script (and I don't know the DFU format very
well), but you can either user use this [dfuse-extractor](https://github.com/the6p4c/dfuse-extract)
(which separates the DFU image into 3 files, internal, slotA and slotB)
or use the script from the [downgrade documentation] (used for
N0110 unlocking, and works well).

The script work fine for N0110 and N0115. For N0120, you need to replace
`internal_size = 64 * 1024` by `internal_size = 512 * 1024` (line 53, just after
`def unpack(fw):`). For N0100, you need `internal_size = 1024 * 1024`.

The script will create `internal.bin` (bootloader) and `external.bin`
(slots and kernel) files.

::: warning
On unlocked calculators, avoid flashing `internal.bin` file, as it contains the
bootloader which will lock the calculator, and will block downgrade if you flash
one from Epsilon 19 or later, where you will need a Raspberry PI or Pico to
unlock it (in French at [tiplanet](https://tiplanet.org/forum/viewtopic.php?f=113&t=25191),
with English translation [here](https://github.com/ErynGalen/nw-rpi-guide)).
:::

Once you got the files, you can whatever you want with them, like flashing them
using the WebDFU, disassembling them (using Ghidra, for example) or simply
extracting information.

[numworks/epsilon]: https://github.com/numworks/epsilon
[build instructions]: https://www.numworks.com/engineering/software/build/
[downgrade documentation]: https://guide.getomega.dev/docs/unlock/phi/install-epsilon-18-2-0
