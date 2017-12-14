'use strict'

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
    return parseFloat(request.params.page) || 1
  }

  getNext (request, currentPage, lastPage) {
    // return if current page is the last one, there's no more
    if (currentPage === lastPage) {
      return
    }

    const url = this.getUrlWithoutTrailingPage(request)
    return this.composeUrlWithPage(url, currentPage + 1)
  }

  getPrevious (request, currentPage) {
    // return if current page is the first one, there's no zero :)
    if (currentPage === 1) {
      return
    }

    const url = this.getUrlWithoutTrailingPage(request)
    return this.composeUrlWithPage(url, currentPage - 1)
  }

  getUrlWithoutTrailingPage (request) {
    const url = request.url.path

    // there's no "/page/" part in the URL (like initial overview page), then just return the current url
    if (!this.hasPageParam(url)) {
      return `${url}/page`
    }

    return url.substring(0, url.lastIndexOf('/'))
  }

  hasPageParam (url) {
    return url.includes('/page/')
  }

  composeUrlWithPage (url, page) {
    return `${url}/${page}`
  }
}

module.exports = Paginator
