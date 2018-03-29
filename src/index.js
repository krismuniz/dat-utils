/**
* @function getDirPaths
* @description Gets all paths necessary to complete the directory tree for a given path
* @param {string} path - the path to the directory to be created
* @returns {Array<string>} - an array of strings for each path in the directory-tree
*/
const getDirPaths = (path) => {
  let dirs = path.split('/')

  return dirs.map((v, i) => [...dirs.slice(1, i), v].map((v) => `/${v}`).join(''))
}

/**
* @function deepMkdir
* @description Adds a directory, including the containing directory-tree (if necessary)
* @param {DatArchive} archive - the archive to verify
* @param {string} path - the path to the directory to be created
* @returns {Promise<void>} - an empty Promise :'(
*/
const deepMkdir = async (archive, path) => {
  let dirs = getDirPaths(path).slice(0, -1)

  for (let directoryPath of dirs) {
    if (directoryPath !== '/') {
      try {
        await archive.readdir(directoryPath)
      } catch (e) {
        await archive.mkdir(directoryPath)
      }
    }
  }

  try {
    await archive.readdir(path)
  } catch (e) {
    await archive.mkdir(path)
  }
}

/**
* @function deepWriteFile
* @description Writes a file and creates necessary directory-tree
* @param {DatArchive} archive - the archive to verify
* @param {string} path - the path to the directory to be created
* @returns {Promise<void>} - an empty Promise :'(
*/
const deepWriteFile = async (archive, path, data, options = { encoding: 'utf8' }) => {
  await deepMkdir(archive, path.split('/').slice(0, -1).join('/'))

  return archive.writeFile(path, data, options)
}

/**
* @function fileExists
* @description Check if a file exists
* @param {DatArchive} archive - the archive to verify
* @param {string} path - the path to the file
* @returns {Promise<boolean>} - `true` or `false` (found or not found)
*/
const fileExists = async (archive, path) => {
  try {
    await archive.stat(path)
    return true
  } catch (e) {
    return false
  }
}

/**
* @function writeOrModifyFile
* @description Writes a file or modifies it if it exists
* @param {DatArchive} archive - the archive to verify
* @param {string} path - the path to the file
* @param {string} data - the data to be written
* @returns {Promise<void>} - an empty Promise :'(
*/
const writeOrModifyFile = async (archive, path, data, options = { encoding: 'utf8' }) => {
  if (await fileExists(archive, path)) {
    await archive.unlink(path)
  }

  return deepWriteFile(archive, path, data, options)
}

/**
* @function copyFile
* @description Copy a file from one archive to another
* @param {DatArchive} source - the archive to copy from
* @param {DatArchive} target - the archive to copy to
* @param {string} path - the path to the file to be copied
* @param {object} options
* @returns {Promise<void>} - an empty Promise :'(
*/
const copyFile = async (source, target, path, options = { encoding: 'utf8' }) => {
  const data = await source.readFile(path, options)
  const newPath = options.new_path || path

  if (options.override) {
    return writeOrModifyFile(target, newPath, data, options)
  } else {
    return deepWriteFile(target, newPath, data, options)
  }
}

export { deepMkdir, deepWriteFile, fileExists, writeOrModifyFile, copyFile }
