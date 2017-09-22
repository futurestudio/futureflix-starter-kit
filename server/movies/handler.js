'use strict'

const Joi = require('joi')
const Path = require('path')
const Movie = require(Path.resolve(__dirname, '..', 'models')).Movie

const Handler = {
  index: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: (request, reply) => {
      Movie.find().then(movies => {
        reply.view('movies/index', { movies })
      })
    }
  },

  single: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: (request, reply) => {
      const slug = request.params.slug

      Movie.findOne({ 'ids.slug': slug }).then(movie => {
        if (!movie) {
          return reply.view('404')
        }

        reply.view('movies/single', { movie }, { layout: 'movie-hero' })
      })
    },
    validate: {
      params: {
        slug: Joi.string().required()
      }
    }
  }
}

module.exports = Handler
