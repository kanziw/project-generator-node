const fs = require('fs')
const { join } = require('path')

const exclude = [
  '.git',
  '.idea',
  'node_modules',
  'generator',
  'dist',
]

/**
 * @param currentDirPath {string}
 * @param projectFiles {string[]}
 * @returns {string[]}
 */
module.exports = function walkSync (currentDirPath, projectFiles = []) {
  return fs.readdirSync(currentDirPath)
    .filter(name => !exclude.includes(name))
    .map(name => {
      const filePath = join(currentDirPath, name)
      const stat = fs.statSync(filePath)
      if (stat.isFile()) {
        return projectFiles.concat(filePath)
      } else if (stat.isDirectory()) {
        return walkSync(filePath, projectFiles)
      }
      return projectFiles
    })
}
