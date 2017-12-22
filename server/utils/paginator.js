'use strict'

const _ = require('lodash')
const Querystring = require('querystring')

class Paginator {
  constructor (request, totalCount, perPage = 8) {
    const lastPage = Math.ceil(totalCount / perPage)
    const currentPage = this.getCurrentPage(request)
    const from = currentPage * perPage - perPage

    const previous = this.getPrevious(request, currentPage)
    const next = this.getNext(request, currentPage, lastPage)

    return {
      total: totalCount,
      perPage,
      currentPage,
      lastPage,
      next,
      previous,
      from,
      to: from + perPage
    }
  }

  getCurrentPage (request) {
    return parseFloat(request.query.page) || 1
  }

  getNext (request, currentPage, lastPage) {
    // return if current page is the last one, there's no more
    if (currentPage === lastPage) {
      return
    }

    return this.composeUrl(request, currentPage + 1)
  }

  getPrevious (request, currentPage) {
    // return if current page is the first one, there's no zero :)
    if (currentPage === 1) {
      return
    }

    return this.composeUrl(request, currentPage - 1)
  }

  hasPage (request) {
    return !_.isNil(request.query.page)
  }

  composeUrl (request, page) {
    const queryParams = Object.assign(request.query, { page })
    const query = Querystring.stringify(queryParams)

    return `${request.path}?${query}`
  }
}

module.exports = Paginator
