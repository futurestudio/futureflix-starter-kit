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

describe('requests with payload, headers and params,', () => {
  it('injects payload', async () => {
    const server = new Hapi.Server()

    // add route to hapi server with handler that directly returns the request payload
    server.route({
      method: 'POST',
      path: '/',
      handler: request => {
        // you can do assertions here, too
        expect(request.payload).to.exist()

        return request.payload
      }
    })

    // remember: injecting payload isn’t available on GET requests
    // use HTTP methods that support reuqest payload, like POST and PUT
    const injectOptions = {
      method: 'POST',
      url: '/',
      payload: {
        name: 'Marcus',
        isDeveloper: true,
        isHapiPassionate: 'YEEEEAHHH'
      }
    }

    const response = await server.inject(injectOptions)
    const payload = JSON.parse(response.payload || {})

    // set your expectations :)
    expect(payload.name).to.equal('Marcus')
    expect(payload.isDeveloper).to.equal(true)
    expect(payload.isHapiPassionate).to.exist()
  })

  it('injects headers', async () => {
    const server = new Hapi.Server()

    server.route({
      method: 'GET',
      path: '/',
      handler: request => {
        if (request.headers['x-custom-header']) {
          return {
            a: 'different object',
            based: 'on the request headers'
          }
        }
      }
    })

    const injectOptions = {
      method: 'GET',
      url: '/',
      headers: { 'x-custom-header': 'my-funky-value' }
    }

    const response = await server.inject(injectOptions)
    const payload = JSON.parse(response.payload || {})

    expect(payload.a).to.exist()
    expect(payload.based).to.exist()
  })

  it('injects query params', async () => {
    const server = new Hapi.Server()

    server.route({
      method: 'GET',
      path: '/',
      handler: request => {
        return request.query
      }
    })

    const response = await server.inject('/?name=Marcus')
    const payload = JSON.parse(response.payload || {})

    expect(payload.name).to.equal('Marcus')
  })

  it('injects path params', async () => {
    const server = new Hapi.Server()

    server.route({
      method: 'GET',
      path: '/{name}',
      handler: request => {
        return request.params
      }
    })

    const response = await server.inject('/marcus')
    const payload = JSON.parse(response.payload || {})

    expect(payload.name).to.equal('marcus')
  })

  it('injects payload, headers and params', async () => {
    const server = new Hapi.Server()

    server.route({
      method: 'POST',
      path: '/{name}',
      handler: request => {
        return {
          payload: request.payload,
          headers: request.headers,
          params: request.params,
          query: request.query
        }
      }
    })

    const injectOptions = {
      method: 'POST',
      url: '/marcus?isDeveloper=yes',
      payload: { team: 'Future Studio' },
      headers: { 'x-custom-header': 'my-funky-value' }
    }

    const response = await server.inject(injectOptions)
    const payload = JSON.parse(response.payload || {})

    expect(payload.headers['x-custom-header']).to.equal(injectOptions.headers['x-custom-header'])
    expect(payload.payload.team).to.equal(injectOptions.payload.team)
    expect(payload.query.isDeveloper).to.equal('yes')
    expect(payload.params.name).to.equal('marcus')
  })
})
