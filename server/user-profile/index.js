'use strict'

const Routes = require('./routes')

function register (server, options) {
  server.dependency(['vision'])

  server.route(Routes)
  server.log('info', 'Plugin registered: user profile')
}

exports.plugin = {
  name: 'user-profile',
  version: '1.0.0',
  register
}
