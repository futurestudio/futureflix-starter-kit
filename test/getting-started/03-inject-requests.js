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
  it('inject a request', async () => {
    const server = new Hapi.Server()
    server.route({
      method: 'GET',
      path: '/',
      handler: () => {
        return { name: 'Marcus', isDeveloper: true, isHapiPassionate: 'YEEEEAHHH' }
      }
    })

    const injectOptions = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(injectOptions)
    expect(response.statusCode).to.equal(200)

    // shortcut to payload
    const payload = JSON.parse(response.payload)
    expect(payload.name).to.equal('Marcus')
  })

  it('register the base plugin and inject a request', async () => {
    const server = new Hapi.Server()

    const basePluginPath = Path.resolve(__dirname, '..', '..', 'server', 'base')
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
