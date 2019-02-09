const { pipe } = require('fxjs2')
const applyTemplate = require('./lib/applyTemplate')
const initializeProject = require('./lib/initializeProject')
const removeGenerator = require('./lib/removeGenerator')

/** @type {function(): Promise} */
const run = pipe(
  applyTemplate,
  initializeProject,
  removeGenerator,
)

run().catch(err => console.error(err))
