'use strict'

const _ = require('lodash')

exports.register = function (server, options, next) {
  server.ext('onPreResponse', function (request, reply) {
    const response = request.response

    // rendering a view? then add the user object
    if (response.variety && _.isEqual(response.variety, 'view')) {
      response.source.context = response.source.context || {}

      if (request.auth.isAuthenticated && request.user.id) {
          response.source.context.user = request.user
          return reply.continue()

        // add user object to response data and make it available to views
        // return User.findById(request.user.id).then(function (user) {
        //   response.source.context.user = user
        //   return reply.continue()
        // })
      }
    }

    return reply.continue()
  })

  server.log('info', 'Plugin registered: add user model data to views')
  next()
}

exports.register.attributes = {
  name: 'add-user-object-to-views',
  version: '1.0.0'
}
