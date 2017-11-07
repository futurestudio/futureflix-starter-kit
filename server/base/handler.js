'use strict'

const _ = require('lodash')
const Boom = require('boom')
const Path = require('path')
const Movie = require(Path.resolve(__dirname, '..', 'models')).Movie
const Show = require(Path.resolve(__dirname, '..', 'models')).Show

const Handler = {
  index: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: function (request, reply) {
      Movie.random(7)
        .then(movies => {
          return Show.random(6).then(shows => {
            return Promise.resolve({ movies, shows })
          })
        })
        .then(({ movies, shows }) => {
          reply.view(
            'index',
            {
              movie: _.first(movies), // gets a random movie
              movies: _.slice(movies, 1),
              shows
            },
            { layout: 'hero' }
          )
        })
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
    handler: (request, reply) => {
      const accept = request.headers.accept

      if (accept && accept.match(/json/)) {
        return reply(Boom.notFound('Fuckity fuck, this resource isn’t available.'))
      }

      reply.view('404').code(404)
    }
  }
}

module.exports = Handler
