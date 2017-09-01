'use strict'

const Handler = {
  profile: {
    //auth: 'session',
    handler: (request, reply) => {
      reply.view('profile')
    }
  }
}

module.exports = Handler
