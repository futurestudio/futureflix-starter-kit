'use strict'

const Routes = require('./routes')

function register (server, options) {
  server.dependency(['vision'])

  server.route(Routes)
  server.log('info', 'Plugin registered: tv shows')
}

exports.plugin = {
  name: 'tv-shows',
  version: '1.0.0',
  register
}
