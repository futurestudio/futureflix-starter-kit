'use strict'

async function register (server, options) {
  // declare dependencies to hapi-auth-* plugins
  await server.register([
    // register hapi-auth-* plugins here
  ])

  /**
   * Register cookie-based session auth to remember
   * the logged in user
   */
}

exports.plugin = {
  name: 'authentication',
  version: '1.0.0',
  register
}
