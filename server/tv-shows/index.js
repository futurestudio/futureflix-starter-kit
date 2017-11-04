'use strict'

const Routes = require('./routes')

exports.register = (server, options, next) => {
  server.dependency([ 'vision' ])

  server.route(Routes)
  server.log('info', 'Plugin registered: tv shows')

  next()
}

exports.register.attributes = {
  name: 'tv-shows',
  version: '1.0.0'
}
