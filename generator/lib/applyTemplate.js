const { deepFlat, pipe } = require('fxjs2')
const shelljs = require('shelljs')
const { join } = require('path')
const walkSync = require('./walkSync')
const { rootPath } = require('../const')
const config = require('../generator-config')

const gatherProjectFiles = pipe(walkSync, deepFlat)
/** @type {string[]} */
const projectFiles = gatherProjectFiles(rootPath)

module.exports = function applyTemplate () {
  shelljs.sed(
    '-i',
    'project-generator-node',
    '{{projectName}}',
    join(rootPath, 'package.json'),
  )
  Object.entries(config).forEach(([ key, value ]) => {
    projectFiles.forEach(filePath =>
      shelljs.sed('-i', `\{\{${key}\}\}`, value, filePath)
    )
  })
}
