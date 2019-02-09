const shelljs = require('shelljs')
const { join } = require('path')
const { rootPath } = require('../const')
const config = require('../generator-config')

const fullProjectName = `${config.githubProfileOrOrganizationName}/${config.projectName}`
const gitOriginAddress = `git@github.com:${fullProjectName}.git`

const joinRootPath = filePath => join(rootPath, filePath)

const removeFilePaths = [
  'node_modules',
  'dist',
  '.git',
  '.idea',
].map(joinRootPath)
const gitCommands = [
  `git init`,
  `git remote add origin ${gitOriginAddress}`,
  'git add -A',
  `git commit -m"Initialize ${config.projectName} project"`,
]
const [ srcHookPath, distHookPath ] = [
  'generator/template/git/hooks/*',
  '.git/hooks',
].map(joinRootPath)

const packageJsonPath = join(rootPath, 'package.json')

module.exports = async function initializeProject () {
  shelljs.rm('-rf', removeFilePaths)

  await exec(gitCommands.join(' && '))
  await exec(`sed -i '' '/postInstall.js/d' ${packageJsonPath}`)

  shelljs.cp(srcHookPath, distHookPath)
}

/**
 * @param commands {string|string[]}
 * @returns {Promise<string>}
 */
function exec (commands) {
  return new Promise((resolve, reject) => {
    shelljs.exec(commands, (code, stdout, stderr) =>
      stderr
        ? reject(new Error(`Error raised with code [${code}]`))
        : resolve(stdout)
    )
  })
}
