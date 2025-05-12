# Addresses and structures

The calculator has a lot of headers and parsable structures about a lot of
features: it's used for storage, current slot, username, current version…

The [Upsilon.js] library was designed to parse them with backward-compatibility.
On this page, we will only describe structures for recent Epsilon versions
(16+), which are also used on custom firmwares for unlocked calculators.

<!-- TODO: Link with communication with the computer/DFU -->

## Determining device model

When reading structs, you need to know the calculator model you are using,
especially when you want to read the [Slot Info](#slot-info).

### Based on bcdDevice

::: info
This method is intended to be used from a computer, for example by [Upsilon.js].
:::

For N0115 and N0120, this method is always reliable and the easiest one to
implement. There won't be any false positive or false negative as they only run
recent Epsilon versions implementing bcdDevice.

If bcdDevice indicate N0110, it will be an N0110. However, the reverse is not
true: on N0110, before Epsilon 17 and on custom firmwares, was the same as
N0100, so you should fall back to other detections method in case you detect
N0100. In case you are interested by the commit adding this feature, it's
[d63617](https://github.com/numworks/epsilon/commit/d63617034c1379989129a92cd049ca44956c1a94)
on [Epsilon] repository.

From you computer shell, you can detect it using `lsusb -v`

::: details Output for an N0110 calculator running Epsilon 23

```bash
$ lsusb -v
Bus 001 Device 071: ID 0483:a291 STMicroelectronics NumWorks Calculator
Negotiated speed: Full Speed (12Mbps)
Device Descriptor:
  bLength                18
  bDescriptorType         1
  bcdUSB               2.10
  bDeviceClass            0 [unknown]
  bDeviceSubClass         0 [unknown]
  bDeviceProtocol         0 
  bMaxPacketSize0        64
  idVendor           0x0483 STMicroelectronics
  idProduct          0xa291 NumWorks Calculator
  bcdDevice            1.10 # <<< Here's the model <<<
  iManufacturer           1 NumWorks
  iProduct                2 NumWorks Calculator
  iSerial                 3 XXXXXXXXXXXXXXXX
  bNumConfigurations      1
  Configuration Descriptor:
    bLength                 9
    bDescriptorType         2
    wTotalLength       0x0024
    bNumInterfaces          1
    bConfigurationValue     1
    iConfiguration          0 
    bmAttributes         0x80
      (Bus Powered)
    MaxPower              100mA
    Interface Descriptor:
      bLength                 9
      bDescriptorType         4
      bInterfaceNumber        0
      bAlternateSetting       0
      bNumEndpoints           0
      bInterfaceClass       254 Application Specific Interface
      bInterfaceSubClass      1 Device Firmware Update
      bInterfaceProtocol      2 
      iInterface              4 @Flash/0x90030000/61*064Kg,64*064Kg
    Interface Descriptor:
      bLength                 9
      bDescriptorType         4
      bInterfaceNumber        0
      bAlternateSetting       1
      bNumEndpoints           0
      bInterfaceClass       254 Application Specific Interface
      bInterfaceSubClass      1 Device Firmware Update
      bInterfaceProtocol      2 
      iInterface              5 @SRAM/0x20000000/01*252Ke
      Device Firmware Upgrade Interface Descriptor:
        bLength                             9
        bDescriptorType                    33
        bmAttributes                        3
          Will Not Detach
          Manifestation Intolerant
          Upload Supported
          Download Supported
        wDetachTimeout                      0 milliseconds
        wTransferSize                    2048 bytes
        bcdDFUVersion                   1.00
Binary Object Store Descriptor:
  bLength                 5
  bDescriptorType        15
  wTotalLength       0x001d
  bNumDeviceCaps          1
  Platform Device Capability:
    bLength                24
    bDescriptorType        16
    bDevCapabilityType      5
    bReserved               0
    PlatformCapabilityUUID    {3408b638-09a9-47a0-8bfd-a0768815b665}
      WebUSB:
        bcdVersion    1.00
        bVendorCode      1
        iLandingPage     1 https://my.numworks.com
Device Status:     0x0000
  (Bus Powered)
```

:::

However, the calculator is often used from WebUSB, so here's a simple JavaScript
implementation (from [Upsilon.js]):

```javascript
let usbDeviceVersion = "" + this.device.device_.deviceVersionMajor + this.device.device_.deviceVersionMinor + this.device.device_.deviceVersionSubminor
switch (usbDeviceVersion) {
    case "120":
        return "0120";
    case "115":
        return "0115";
    case "110":
        return "0110"
    // We can't match on N0100 as some N0110 firmwares are returning 100
}
```

### Based on flash size

::: info
This method is intended to be used from a computer, for example by [Upsilon.js].
:::

`bcdDevice` allows reducing the possible models to 2: N0100 and N0110.
The main difference between N0100 and N0110 is the presence of an external
flash.

On recent Epsilon versions, the internal flash is hidden.

The logic could be simplified, but I don't have time to test on every
configuration, so just read the code of the
[getModel](https://github.com/UpsilonNumworks/upsilon.js/blob/master/Numworks.js#L45)
function.

### Based on FCC ID

::: info
This method is intended to be used from NWA external apps
:::

There is an [SVC call](../apps/syscalls.md#manual-syscalls) named `SVC_FCC_ID`
that return a `const char *` (in register R0) pointing to a string containing
the FFC ID, as visible in the settings of the calculator under the "About"
submenu.

On my N0110, the string is defined as `2ALWP-N0110`, so the model can be
determined this way.

This method is isn't implemented at the time on any external app, but it's
probably one of the most reliable way to do so

### Based on installed slots

::: info
This method is intended to be used from NWA external apps
:::

Unlike the previous method, this one can have false positives.
<!-- TODO: Based on program counter to determine current slot and avoid false
           positives? -->

The location of the userland header is different between N0110 and N0120 (see
the [userland header](#userland-header) section), so we can exploit this
difference.

On [NumWorks Extapp Storage](../apps/storage.md), that's the method that's used
(simplified for easier reading):

::: details C implementation, collapsed as the code is quite long

```c
// Function to reverse the endianness, not required but allow writing code in
// the right endianness for reading and calculator at the same time
inline uint32_t reverse32(uint32_t value) {
  return (((value & 0x000000FF) << 24) |
          ((value & 0x0000FF00) <<  8) |
          ((value & 0x00FF0000) >>  8) |
          ((value & 0xFF000000) >> 24));
}


const uint8_t extapp_calculatorModel() {
    uint32_t * userlandMagicSlotAN0110 = *(uint32_t **)0x90010000;
    uint32_t * userlandMagicSlotBN0110 = *(uint32_t **)0x90410000;
    uint32_t * userlandMagicSlotAN0120 = *(uint32_t **)0x90020000;
    uint32_t * userlandMagicSlotBN0120 = *(uint32_t **)0x90420000;

    bool userlandMagicSlotAN0110IsValid = reverse32(0xfeedc0de) == (uint32_t)userlandMagicSlotAN0110;
    bool userlandMagicSlotBN0110IsValid = reverse32(0xfeedc0de) == (uint32_t)userlandMagicSlotBN0110;
    bool userlandMagicSlotAN0120IsValid = reverse32(0xfeedc0de) == (uint32_t)userlandMagicSlotAN0120;
    bool userlandMagicSlotBN0120IsValid = reverse32(0xfeedc0de) == (uint32_t)userlandMagicSlotBN0120;

    int N0110Counter = userlandMagicSlotAN0110IsValid + userlandMagicSlotBN0110IsValid;
    int N0120Counter = userlandMagicSlotAN0120IsValid + userlandMagicSlotBN0120IsValid;

    // At least one slot indicate N0110 and none N0120
    if ((N0110Counter > 0) && (N0120Counter == 0)) {
        return 1;
    }

    // At least one slot indicate N0120 and none N0110
    if ((N0120Counter > 0) && (N0110Counter == 0)) {
        return 2;
    }

    // We weren't able to determine the model, so we just return unknown
    return 0;
}
```

:::

It will return 0 if the model is unknown, 1 for N0110 or N0115 and 2 for N0120.
This method doesn't make any difference between the N0110 and N0115 as it's not
required for accessing storage.

This function is available in [NumWorks Extapp Storage](../apps/storage.md), so
you probably don't need to use this code in your app.

<!--
TODO: Based on heap address?
https://github.com/numworks/epsilon/blob/master/eadk/src/platform.c#L15
It could be available using `_heap_start`. I should check if this symbol is
usable inside the external app, but if the structure is similar to Upsilon
External, it's probably the case.
-->

## Slot Info

The slotInfo address depend on the calculator model (see the previous section,
[determining device model](#determining-device-model)).

| Model           | Address      |
| --------------- | ------------ |
| N0110 and N0115 | `0x20000000` |
| N0120           | `0x24000000` |

This address is the beginning of the RAM as the slot info is stored there.

The structure is very simple:

| Index | Size (bytes) | Format | Name                    | Usage                                        |
| ----- | ------------ | ------ | ----------------------- | -------------------------------------------- |
| 0x0   | 4            | uint32 | Magic (0xBADBEEEF)      | Determine if the slot info is valid          |
| 0x4   | 4            | uint32 | Kernel header address   | Get the start address of the kernel header   |
| 0x8   | 4            | uint32 | Userland header address | Get the start address of the userland header |
| 0xC   | 4            | uint32 | Magic (0xBADBEEEF)      | Determine if the slot info is valid          |

You can get the start address of the [slot] by doing
"Kernel header address" - 0x8. For the slot A, it will return `0x90000000`. For
the slot B, it will return `0x90400000`. For the slot Khi, it will return
`0x90180000`. See the table in
[slots / Custom firmwares](slots.md#custom-firmwares) for more details.

## Kernel header

The kernel starts at the slot start.
The Kernel Header immediately follows the first 8 bytes of the kernel, which are not part of the header itself.
The address of the Kernel Header is also given in the [slot info](#slot-info).

Here is what the first 8 bytes of the kernel contain:

| Index (from kernel start) | Size (bytes) | Format | Name                                 | Usage                                       |
| ------------------------- | ------------ | ------ | ------------------------------------ | ------------------------------------------- |
| 0x0                       | 4            | uint32 | Null bytes                           |                                             |
| 0x4                       | 4            | uint32 | Size of kernel (from 0x8) + userland | Used for signature check                    |

The Kernel Header contains some metadata about the kernel, but unless a kernel is running a
different version than the userland (shouldn't happen during normal use), the
userland header will contain the same information. The only information that's
only available in the kernel header is the patch level (git commit).

| Index (from kernel header) | Size (bytes) | Format | Name                                 | Usage                                       |
| -------------------------- | ------------ | ------ | ------------------------------------ | ------------------------------------------- |
| 0x0                        | 4            | uint32 | Magic (0xF00DC0DE)                   | Determine if the kernel header is valid     |
| 0x4                        | 8            | string | Version                              | Version number of the kernel, like `23.2.5` |
| 0xC                        | 8            | string | Patch level                          | Commit of the kernel, like `cba3ef2`        |
| 0x14                       | 4            | uint32 | Magic (0xF00DC0DE)                   | Determine if the kernel header is valid     |

## Userland header

Userland header address is different between N0110, N0115 and N0120:

| Model           | Slot A userland header | Slot B userland header |
| --------------- | ---------------------- | ---------------------- |
| N0110 and N0115 | `0x90010000`           | `0x90410000`           |
| N0120           | `0x90020000`           | `0x90420000`           |

It's address can be retrieved in the [slot info](#slot-info) for easier
processing.

It's one of the most useful header, and contain many informations:

| Index | Size (bytes) | Format | Name                                   | Usage                                                |
| ----- | ------------ | ------ | -------------------------------------- | ---------------------------------------------------- |
| 0x0   | 4            | uint32 | Magic (0xFEEDC0DE)                     | Determine if the userland header is valid            |
| 0x4   | 8            | string | Version                                | Version number of the userland, like `23.2.5`        |
| 0xC   | 4            | uint32 | Storage address                        | Address of the Python storage inside the RAM         |
| 0x10  | 4            | uint32 | Storage size                           | Size of the Python storage                           |
| 0x14  | 4            | uint32 | External apps flash start              | Start of the zone where external apps can be flashed |
| 0x18  | 4            | uint32 | External apps flash end                | End of the zone where external apps can be flashed   |
| 0x1C  | 4            | uint32 | External apps ram start                | Start of the RAM zone where external apps can run    |
| 0x20  | 4            | uint32 | External apps ram end                  | End of the RAM zone where external apps can run      |
| 0x24  | 4            | uint32 | Magic (before Epsilon 22) (0xFEEDC0DE) | Determine if the userland header is valid            |
| 0x24  | 4            | uint32 | Username start (after Epsilon 22)      | Start of the flash zone where username is written    |
| 0x28  | 4            | uint32 | Username end (after Epsilon 22)        | End of the flash zone where username is written      |
| 0x3C  | 4            | uint32 | Magic (after Epsilon 22) (0xFEEDC0DE)  | Determine if the userland header is valid            |

Username flash zone only appeared with Epsilon 22, so it wasn't in the userland header before.

On custom firmwares, the normal userland header is directly followed by Omega
and Upsilon headers:

| Index | Size (bytes) | Format | Name                              | Usage                                                |
| ----- | ------------ | ------ | --------------------------------- | ---------------------------------------------------- |
| 0x0   | 4            | uint32 | Omega magic (0xDEADBEEF)          | Determine if Omega (or a fork or Omega) is installed |
| 0x4   | 16           | string | Omega version                     | Version number of Omega userland, like `2.0.2`       |
| 0x14  | 16           | string | Omega username                    | Username of the Omega installation, as ASCII string  |
| 0x24  | 4            | uint32 | Omega magic (0xDEADBEEF)          | Determine if Omega (or a fork or Omega) is installed |
| 0x28  | 4            | uint32 | Upsilon magic (0x69737055)        | Determine if Upsilon is installed                    |
| 0x3C  | 16           | string | Upsilon version                   | Version number of Upsilon, like `1.0.1-dev`          |
| 0x4C  | 4            | uint32 | osType (0x78718279 for Upsilon)   | Value that should be unique to each Upsilon fork     |
| 0x50  | 4            | uint32 | Upsilon magic (0x69737055)        | Determine if Upsilon is installed                    |

The userland header is automatically parsed by [Upsilon.js].

## Storage structure

The storage base address and size can be found inside the
[userland header](#userland-header).

The structure of the storage is very simple:

- At index 0x0, a magic (0xBADD0BEE) to determine if the storage is valid
- A succession of records
- At least one zero byte after a records
- Another magic at the end (0xBADD0BEE)

A record is also very simple:

- Size of the records (encoded as uint16, so 2 bytes). Adding the size to the
  address of the size will lead to the next record size
- Filename, as a zero-terminated string
- Content. Its size is determined as "size - 2 - (filename length + 1)". The -2
  offset is to remove the 2 bytes used by the size itself, and the filename + 1
  is to remove the filename and its zero byte at the end.

If the size of a record is 0, then the storage can be assumed as finished.
However, to avoid potential corruption when manipulating storage, the space
between the last record and the end of the storage should be entirely
zero-filled.

The [NumWorks Extapp Storage](../apps/storage.md) library is trying to implement
this structure for external apps without needing to care about the underlying
data structure. From a computer, you can use [Upsilon.js].

### Python scripts

Python scripts are a bit special as they need to store the automatic importation
state for the console. It's implemented by making the first byte of the content
a boolean. To read a Python file, you will have to shift by one the address
where you are reading to get the real content.

Another particularity of Python scripts are that they are zero-terminated for
easier internal processing.

### Internal files

On recent Epsilon versions, files named `pr.sys` and `gp.sys` seems to hold user
preferences and have to be the first files of the storage. They shouldn't be
removed at the risk of crashing the calculator (reboot).

Other applications files (equations, grapher, statistics, sequences,
user-defined variables in calculations, regressions and possibly other files)
aren't stable between Epsilon versions, so be careful when restoring a backup of
the calculator files (for example using [NumWorks Connector]).

[Upsilon.js]: https://github.com/UpsilonNumworks/upsilon.js/
[Epsilon]: https://github.com/numworks/epsilon
[slot]: slots.md
[NumWorks Connector]: https://yaya-cout.github.io/Numworks-connector/
