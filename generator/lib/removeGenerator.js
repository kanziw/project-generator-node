const path = require('path')
const shelljs = require('shelljs')
const { rootPath } = require('../const')

module.exports = function removeGenerator () {
  shelljs.rm('-rf', path.join(rootPath, 'generator'))
}
