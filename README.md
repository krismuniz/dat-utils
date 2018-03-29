# Dat Utils

A small set of utilities to ease the process of building decentralized apps on top of the [DatArchive API](https://beakerbrowser.com/docs/apis/dat.html) in the form of an ES6 module.

With this module you can copy files from one archive to another (`copyFile`), deep-write files (`deepWriteFile`), check if a file exists (`fileExists`), and create dirs without worrying about about the directory-tree (`deepMkdir`).

##### Quick Example:

```js
import { copyFile } from '/modules/dat-utils.js'

const archiveA = await DatArchive.select() // or new DatArchive(<dat_url>)
const archiveB = await DatArchive.select() // or new DatArchive(<dat_url>)

copyFile(archiveA, archiveB, '/deep/path/to/index.html')
```

The code above deep-copies `/deep/path/to/index.html` from `archiveA` to `archiveB`. No need to create `/deep`, `/deep/path`, or `/deep/path/to/` directories.

## Requirements

* [Beaker Browser](https://beakerbrowser.com) v0.8 or greater
  * ES6 Modules support
  * `DatArchive` API support
* Some knowledge of [`DatArchive` API](https://beakerbrowser.com/docs/apis/dat.html) (it's really easy to learn!)

## Installation

If you are using Beaker Browser, go to [dat://utils-krismuniz.hashbase.io](dat://utils-krismuniz.hashbase.io) and click the "Install Module" button. You will be prompted to select your Dat site/app and when you select it, the installer will automatically add the module to your Dat site's source code!

Alternatively, you can download the source code straight from the [GitHub repo](https://github.com/krismuniz/dat-utils).

## Usage

To use `dat-utils`, you need to have Beaker Browser v0.8 installed since this is an ES6 module.

#### Importing the Module

To import `dat-utils` into your JavaScript code, use the ES6 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) syntax.

```js
import * as utils from '/modules/dat-utils.js'

utils.copyFile(archiveA, archiveB, '/index.html')
```

> Remember to add the [`type="module"`](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) *instead* of `type="text/javascript"` attribute to your `<script>` tag so you can import ES6 modules!

### copyFile

```js
copyFile(source, target, path[, options])
```

Deep-copy files from one Dat Archive to another using `.copyFile()`.

##### Example

```js
import { copyFile } from '/modules/dat-utils.js'

const from = await DatArchive.select() // or new DatArchive(<dat_url>)
const to = await DatArchive.select() // or new DatArchive(<dat_url>)

await copyFile(from, to, '/index.html')
// writes contents of '/index.html' from one archive to the other, regardless of directory-tree
```

### writeOrModifyFile

```js
writeOrModifyFile(archive, path, data[, options])
```

Write a file, or modify it if it already exists.

##### Example

```js
import { writeOrModifyFile } from '/modules/dat-utils.js'

const archive = new DatArchive(<dat_url>)

await writeOrModifyFile(archive, '/data.txt', 'hello world')
// -> deep-writes to /data.txt, or modifies if it already exists
```

### fileExists

```js
fileExists(archive, path)
```

Returns `true` if the file exists, or `false` if it doesn't

##### Example

```js
import { fileExists } from '/modules/dat-utils.js'

const archive = new DatArchive(<dat_url>)

await fileExists(archive, '/data.txt')
// -> checks if /data.txt exists
```

### deepWriteFile

```js
deepWriteFile(archive, path, data[, options])
```

Deep-writes a file to an archive, regardless of directory-tree shape.

##### Example

```js
import { deepWriteFile } from '/modules/dat-utils.js'

const archive = new DatArchive(<dat_url>)

await deepWriteFile(archive, '/path/to/data.txt', 'hello world!')

// -> writes 'hello world' to /path/to/data.txt
```

### deepMkdir

```js
deepMkdir(archive, path)
```

Recursively creates a directory on the path specified, regardless of directory-tree

##### Example

```js
import { deepMkdir } from '/modules/dat-utils.js'

const archive = new DatArchive(<dat_url>)

await deepMkdir(archive, '/path/to/other/dir')

// -> creates /path, /path/to, /path/to/other, and /path/to/other/dir
```

## Reference

[API Reference](/REFERENCE.md)

## License

[MIT](/LICENSE.md)
