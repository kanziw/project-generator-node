import request from 'supertest'
import app from '../../src/app'

let client = null

class Client {
  constructor(_app) {
    this.app = _app
  }

  async get(path) {
    return new Promise((resolve, reject) => {
      request(this.app)
        .get(path)
        .expect(200)
        .end((err, res) => err ? reject(err) : resolve(res.text || res.body))
    })
  }

  static shared() {
    if (!client) {
      client = new Client(app)
    }
    return client
  }
}

export default Client
