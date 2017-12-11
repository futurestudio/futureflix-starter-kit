'use strict'

const Path = require('path')
const Show = require(Path.resolve(__dirname, '..', 'models')).Show
const Paginator = require(Path.resolve(__dirname, '..', 'utils', 'paginator'))

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

      // shortcuts
      const limit = pagination.limit
      const page = pagination.page

      if (page > pagination.pageCount) {
        return h.view('404')
      }

      const skip = page * limit - limit
      const shows = await Show.find()
        .skip(skip)
        .limit(limit)

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
      const show = await Show.findOne({ 'ids.slug': slug }).populate('seasons')

      if (!show) {
        return h.view('404')
      }

      return h.view('tv-shows/single', { show }, { layout: 'hero' })
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
