'use strict'

const Handler = {
  profile: {
    // auth: 'session',
    handler: (request, reply) => {
      reply.view('user/profile')
    }
  }
}

module.exports = Handler
