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

  it('register the base plugin and inject a request', done => {
    const server = new Hapi.Server()
    server.connection()

    const basePluginPath = Path.resolve(__dirname, '..', '..', 'server', 'base')
    server
      .register([
        {
          register: require('inert')
        },
        {
          register: require('vision')
        },
        {
          register: require(basePluginPath)
        }
      ])
      .then(() => {
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

        server.inject(injectOptions, response => {
          expect(response.statusCode).to.equal(404)

          done()
        })
      })
  })
})
