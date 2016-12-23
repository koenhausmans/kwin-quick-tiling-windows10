# Installation

Execute in the source folder the following command:

```
plasmapkg2 --type kwinscript -i quicktilingwindows-v*.kwinscript
```

# Packaging

To package this kwin-script into a .kwinscript archive, execute:

```
zip -r quicktilingwindows-v$(cat metadata.desktop | grep X-KDE-PluginInfo-Version= | awk -F'=' '{print $2}').kwinscript *
```

