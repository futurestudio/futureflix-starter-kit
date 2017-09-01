'use strict'

const Hoek = require('hoek')
const Boom = require('boom')

exports.register = (server, options, next) => {
  // declare dependencies to hapi-auth-* plugins
  server.register([
    // register hapi-auth-* plugins here
  ], err => {
    Hoek.assert(!err, 'Cannot register authentication plugins')

    /**
     * Register cookie-based session auth to remember
     * the logged in user
     */

    next()
  })
}

exports.register.attributes = {
  name: 'authentication',
  version: '1.0.0'
}
