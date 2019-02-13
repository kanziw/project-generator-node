import { name, version } from '../package'
import Client from './helper/client'

describe('Application', () => {
  it('GET / response application name and version', async () => {
    const msg = await Client.shared().get('/')
    expect(msg).toEqual(`Hello, this is ${name}:${version}`)
  })
})
