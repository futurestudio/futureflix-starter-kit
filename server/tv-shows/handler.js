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
    handler: async (request, h) => {
      const page = parseFloat(request.params.page) || 1
      const limit = 8

      const showCount = await Show.count()
      const pageCount = Math.ceil(showCount / limit)

      if (page > pageCount) {
        return h.view('404')
      }

      const skip = page * limit - limit
      const shows = await Show.find()
        .skip(skip)
        .limit(limit)

      const previous = page === 1 ? 0 : page - 1
      const next = page === pageCount ? 0 : page + 1

      return h.view('tv-shows/index', {
        shows,
        pagination: { page, count: showCount, pageCount, next, previous, for: 'shows' }
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
      return h.view('tv-shows/single', {
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
