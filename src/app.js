import express from 'express'
import { name, version } from '../package.json'

const app = express()

app.get('/', (req, res) => {
  res.send(`Hello, this is ${name}:${version}`)
})

const startServer = port => app.listen(port, () => {
  console.log(`${name} is running on port ${port}`)
})

export { startServer }
export default app
