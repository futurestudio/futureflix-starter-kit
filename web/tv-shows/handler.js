'use strict'

const Joi = require('joi')
const Path = require('path')
const Show = require(Path.resolve(__dirname, '..', '..', 'models')).Show
const Paginator = require(Path.resolve(__dirname, '..', '..', 'utils', 'paginator'))

const Handler = {
  index: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async (request, h) => {
      const showCount = await Show.count()
      const pagination = new Paginator(request, showCount)

      if (pagination.currentPage > pagination.lastPage) {
        return h.view('404').code(404)
      }

      const shows = await Show.find()
        .skip(pagination.from)
        .limit(pagination.perPage)

      return h.view('tv-shows/index', {
        shows,
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
      const show = await Show.findOne({ 'ids.slug': slug })

      if (!show) {
        return h.view('404')
      }

      return h.view('tv-shows/single', { show }, { layout: 'hero' })
    },
    validate: {
      params: {
        slug: Joi.string().required()
      }
    }
  },

  trending: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async (request, h) => {
      return h.view('tv-shows/index')
    }
  },

  popular: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async (request, h) => {
      return h.view('tv-shows/popular', {
        title: 'A Monster Calls',
        year: 2016,
        rating: 'PG13'
      })
    }
  }
}

module.exports = Handler
