'use strict'

const Lab = require('lab')
const Code = require('code')
const Path = require('path')
const Hapi = require('hapi')

// Test files must require the lab module, and export a test script
const lab = (exports.lab = Lab.script())

// shortcuts from lab
const { describe, it } = lab

// shortcuts from code
const expect = Code.expect

describe('inject requests with server.inject,', () => {
  it('inject a request to a hapi server without a route', async () => {
    const server = new Hapi.Server()

    // these must match the route you want to test
    const injectOptions = {
      method: 'GET',
      url: '/'
    }

    // wait for the response and the request to finish
    const response = await server.inject(injectOptions)

    // there’s no route in the new hapi server
    // the injected request should respond with 404
    expect(response.statusCode).to.equal(404)
  })

  it('inject a request', async () => {
    const server = new Hapi.Server()
    server.route({
      method: 'GET',
      path: '/',
      handler: () => {
        return {
          name: 'Marcus',
          isDeveloper: true,
          isHapiPassionate: 'YEEEEAHHH'
        }
      }
    })

    // these must match the route you want to test
    const injectOptions = {
      method: 'GET',
      url: '/'
    }

    // wait for the response and the request to finish
    const response = await server.inject(injectOptions)

    // alright, set your expectations :)
    expect(response.statusCode).to.equal(200)

    // shortcut to payload
    const payload = JSON.parse(response.payload)
    expect(payload.name).to.equal('Marcus')

    // of course you can assign more “expect” statements
  })

  it('register the base plugin and inject a request', { timeout: 5000 }, async () => {
    const server = new Hapi.Server()

    const basePluginPath = Path.resolve(__dirname, '..', '..', 'web', 'base')
    await server.register([
      {
        plugin: require('inert')
      },
      {
        plugin: require('vision')
      },
      {
        plugin: require(basePluginPath)
      }
    ])

    const viewsPath = Path.resolve(__dirname, '..', '..', 'public', 'views')

    server.views({
      engines: {
        hbs: require('handlebars')
      },
      path: viewsPath
    })

    const injectOptions = {
      method: 'GET',
      url: '/404'
    }

    const response = await server.inject(injectOptions)
    expect(response.statusCode).to.equal(404)
  })
})
