'use strict'

const Routes = require('./routes')

function register (server, options) {
  server.dependency(['vision'])

  server.route(Routes)

  server.log('info', 'Plugin registered: movies')
}

exports.plugin = {
  name: 'movies',
  version: '1.0.0',
  register
}
