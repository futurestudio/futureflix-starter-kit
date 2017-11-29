'use strict'

const Lab = require('lab')
const Code = require('code')
const Hapi = require('hapi')

// Test files must require the lab module, and export a test script
const lab = (exports.lab = Lab.script())

// shortcuts from lab
const { describe, it } = lab

// shortcuts from code
const expect = Code.expect

describe('inject requests with server.inject,', () => {
  it('inject a request', done => {
    const routeOptions = {
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        reply({ name: 'Marcus', isDeveloper: true, isHapiPassionate: 'YEEEEAHHH' })
      }
    }

    const server = new Hapi.Server()
    server.connection()
    server.route(routeOptions)

    const injectOptions = {
      method: routeOptions.method,
      url: routeOptions.path
    }

    server.inject(injectOptions, response => {
      expect(response.statusCode).to.equal(200)

      // shortcut to payload
      const payload = JSON.parse(response.payload)

      expect(payload.name).to.equal('Marcus')

      done()
    })
  })
})
