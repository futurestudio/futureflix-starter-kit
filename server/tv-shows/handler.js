'use strict'

const Path = require('path')
const Show = require(Path.resolve(__dirname, '..', 'models')).Show

const Handler = {
  index: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: function (request, reply) {
      Show.find().then(shows => {
        reply.view('tv-shows/index', { shows })
      })
    }
  },

  single: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: function (request, reply) {
      reply.view('tv-shows/single', {
        title: 'A Monster Calls',
        year: 2016,
        rating: 'PG13'
      })
    }
  },

  trending: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: function (request, reply) {
      reply.view('tv-shows/index')
    }
  },

  popular: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: function (request, reply) {
      reply.view('tv-shows/popular', {
        title: 'A Monster Calls',
        year: 2016,
        rating: 'PG13'
      })
    }
  }
}

module.exports = Handler
