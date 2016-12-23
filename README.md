# Quick Tiling - Windows 10

This KWin Script extends the quick tiling functionality in KDE. It adds two shortcuts which behave similar to the 2x2 Snap feature introduced in Windows 10.

When a window is tiled to the left or the right, using the added Upwards and Downwards keyboard shortcuts will tile the window into quadrants.

## Installation

Execute in the source folder the following command:

```
plasmapkg2 --type kwinscript -i quick-tiling-windows-10-v*.kwinscript
```

## Packaging

To package this kwin-script into a .kwinscript archive, execute:

```
zip -r quick-tiling-windows-10-v$(cat metadata.desktop | grep X-KDE-PluginInfo-Version= | awk -F'=' '{print $2}').kwinscript *
```

