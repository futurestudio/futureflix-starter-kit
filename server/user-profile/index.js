'use strict'

const Routes = require('./routes')

exports.register = (server, options, next) => {
  server.dependency([ 'vision' ])

  server.route(Routes)
  server.log('info', 'Plugin registered: user profile')

  next()
}

exports.register.attributes = {
  name: 'user-profile',
  version: '1.0.0'
}
