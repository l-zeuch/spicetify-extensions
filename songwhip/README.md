# Spicetify-Songwhip

[Spicetify](https://github.com/khanhas/spicetify-cli) extension to extend the "share" capabilities by using
[Songwhip](https://songwhip.com).

## What Is Songwhip?

From <https://songwhip.com/about>:

> Songwhip is a free smart music link service that allows artists to reach their entire audience with a single link. Its smart algorithm is able to create rich landing pages that link out to over 14 music streaming platforms, in just a few seconds.
>
> Songwhip is used by thousands of artists across the world to get more people playing their music.
>
> Songwhip was conceived and built by solo software engineer and designer Wilson Page. Wilson is working on the project full-time, relying on donations to cover his expenses and continue its development.

## Install

### Manual

Copy `songwhip.js` into your Spicetify extension directory:

OS      | Path
--------|---------
Linux   | `~/.config/spicetify/Extensions/`
OSX     | `~/spicetify_data/Extensions` or `$SPICETIFY_CONFIG/Extensions`
Windows | `%userprofile%\.spicetify\Extensions\`

Afterwards, enable and apply the extension:

```shell
$ spicetify config extensions songwhip.just
$ spicetify apply
```

### Via [spicetify-marketplace](https://github.com/CharlieS1103/spicetify-marketplace)

Just click `install` on the Spicetify-Songwhip extension.

## Usage

Right-click a track or artist, hit `Songwhip!`, copy the link at the top and enjoy!

## Gallery

![demo](songwhip-demo.png)

----
Copyright (c): Luca Z., 2022.
BSD 3-Clause License.
