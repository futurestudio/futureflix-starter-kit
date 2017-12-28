'use strict'

const Joi = require('joi')
const Path = require('path')
const Movie = require(Path.resolve(__dirname, '..', 'models')).Movie
const Paginator = require(Path.resolve(__dirname, '..', 'utils', 'paginator'))

const Handler = {
  index: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async (request, h) => {
      const showCount = await Movie.count()
      const pagination = new Paginator(request, showCount)

      if (pagination.currentPage > pagination.lastPage) {
        return h.view('404').code(404)
      }

      const movies = await Movie.find()
        .skip(pagination.from)
        .limit(pagination.perPage)

      return h.view('movies/index', {
        movies,
        pagination
      })
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
