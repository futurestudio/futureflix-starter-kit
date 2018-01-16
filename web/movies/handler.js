'use strict'

const Joi = require('joi')
const Path = require('path')
const Movie = require(Path.resolve(__dirname, '..', '..', 'models')).Movie

const Handler = {
  index: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async (request, h) => {
      const movies = await Movie.find()

      return h.view('movies/index', { movies })
    }
  },

  single: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async (request, h) => {
      const slug = request.params.slug
      const movie = await Movie.findOne({ 'ids.slug': slug })

      if (!movie) {
        return h.view('404')
      }

      return h.view('movies/single', { movie }, { layout: 'hero' })
    },
    validate: {
      params: {
        slug: Joi.string().required()
      }
    }
  }
}

module.exports = Handler
