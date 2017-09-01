'use strict'

const Routes = require('./routes')

exports.register = (server, options, next) => {
  server.dependency([ 'vision' ])

  server.route(Routes)
  server.log('info', 'Plugin registered: base routes & assets')

  next()
}

exports.register.attributes = {
  name: 'base-routes-assets',
  version: '1.0.0'
}
