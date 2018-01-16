'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/profile',
    config: Handler.profile
  }
]

module.exports = Routes
