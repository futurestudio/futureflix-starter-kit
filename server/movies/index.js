'use strict'

const Routes = require('./routes')

exports.register = (server, options, next) => {
  server.dependency([ 'vision' ])

  server.route(Routes)
  server.log('info', 'Plugin registered: movies')

  next()
}

exports.register.attributes = {
  name: 'movies',
  version: '1.0.0'
}
