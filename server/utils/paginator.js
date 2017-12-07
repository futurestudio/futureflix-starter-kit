'use strict'

class Paginator {
  constructor (request, totalCount, limit = 8) {
    const pageCount = Math.ceil(totalCount / limit)
    const page = this.getPage(request)

    const previous = this.getPrevious(request, page)
    const next = this.getNext(request, page, pageCount)

    return {
      page,
      totalCount,
      pageCount,
      next,
      previous,
      limit
    }
  }

  getPage (request) {
    return parseFloat(request.params.page) || 1
  }

  getNext (request, page, pageCount) {
    // return if current page is the last one, there's no more
    if (page === pageCount) {
      return
    }

    const url = this.getUrlWithoutTrailingPage(request)
    return this.composeUrlWithPage(url, page + 1)
  }

  getPrevious (request, page) {
    // return if current page is the first one, there's no zero :)
    if (page === 1) {
      return
    }

    const url = this.getUrlWithoutTrailingPage(request)
    return this.composeUrlWithPage(url, page - 1)
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
