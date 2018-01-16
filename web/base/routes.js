'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/',
    config: Handler.index
  },
  {
    method: 'GET',
    path: '/js/{path*}',
    config: Handler.js
  },
  {
    method: 'GET',
    path: '/css/{path*}',
    config: Handler.css
  },
  {
    method: 'GET',
    path: '/images/{path*}',
    config: Handler.images
  },
  {
    method: [ 'GET', 'POST' ],
    path: '/{path*}',
    config: Handler.missing
  }
]

module.exports = Routes
