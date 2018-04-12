# Reference

Reference material for the `dat-utils` module for dat-protocol browsers (like Beaker Browser)

## deepMkdir(archive, path)

Adds a directory, and creates parent directories as needed

### Parameters

**archive**: `DatArchive` the archive to verify

**path**: `string` the path to the directory to be created

**Returns**: `Promise<void>` - an empty Promise


## deepWriteFile(archive, path)

Writes a file, creates parent directories as needed

### Parameters

**archive**: `DatArchive` the archive to verify

**path**: `string` the path to the directory to be created

**Returns**: `Promise<void>` - an empty Promise


## fileExists(archive, path)

Check if a file exists

### Parameters

**archive**: `DatArchive` the archive to verify

**path**: `string` the path to the file

**Returns**: `Promise<boolean>` - `true` or `false` (found or not found)


## writeOrModifyFile(archive, path, data)

Writes a file or modifies it if it exists

### Parameters

**archive**: `DatArchive` the archive to verify

**path**: `string` the path to the file

**data**: `string` the data to be written

**Returns**: `Promise<void>` - an empty Promise


## copyFile(source, target, path, options)

Copy a file from one archive to another

### Parameters

**source**: `DatArchive` the archive to copy from

**target**: `DatArchive` the archive to copy to

**path**: `string` the path to the file to be copied

**options**: `object`

**options.encoding**: `string` one of `utf8`, `base64`, `hex`, `binary`

**Returns**: `Promise<void>` - an empty Promise
