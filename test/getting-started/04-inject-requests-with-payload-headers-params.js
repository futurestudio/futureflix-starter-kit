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
    server.route({
      method: 'POST',
      path: '/',
      handler: request => {
        expect(request.payload).to.exist()
        return request.payload
      }
    })

    const injectOptions = {
      method: 'POST',
      url: '/',
      payload: { name: 'Marcus', isDeveloper: true, isHapiPassionate: 'YEEEEAHHH' }
    }

    const response = await server.inject(injectOptions)
    const payload = JSON.parse(response.payload || {})

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
        return request.headers
      }
    })

    const headers = { 'x-custom-header': 'my-funky-value' }
    const injectOptions = {
      method: 'GET',
      url: '/',
      headers
    }

    const response = await server.inject(injectOptions)
    const payload = JSON.parse(response.payload || {})

    expect(payload['x-custom-header']).to.equal(headers['x-custom-header'])
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
