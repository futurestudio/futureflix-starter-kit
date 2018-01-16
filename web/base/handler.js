'use strict'

const _ = require('lodash')
const Boom = require('boom')
const Path = require('path')
const Movie = require(Path.resolve(__dirname, '..', '..', 'models')).Movie
const Show = require(Path.resolve(__dirname, '..', '..', 'models')).Show

const Handler = {
  index: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async function test (request, h) {
      const [movies, shows] = await Promise.all([Movie.random(7), Show.random(6)])

      return h.view(
        'index',
        {
          movie: _.first(movies), // gets a random movie
          movies: _.slice(movies, 1),
          shows
        },
        { layout: 'hero' }
      )
    }
  },

  css: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: {
      directory: { path: './public/css' }
    }
  },

  js: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: {
      directory: { path: './public/js' }
    }
  },

  images: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: {
      directory: { path: './public/images' }
    }
  },

  missing: {
    handler: (request, h) => {
      const accept = request.headers.accept

      if (accept && accept.match(/json/)) {
        return Boom.notFound('Fuckity fuck, this resource isn’t available.')
      }

      return h.view('404').code(404)
    }
  }
}

module.exports = Handler
