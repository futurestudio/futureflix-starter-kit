'use strict'

const Handler = {
  profile: {
    // auth: 'session',
    handler: (request, h) => {
      return h.view('user/profile')
    }
  }
}

module.exports = Handler
