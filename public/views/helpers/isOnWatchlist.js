'use strict'

module.exports = function (movieOrShow, options) {
  // grab user from Handlebars context
  const user = options.data.root.user

  if (!user) {
    return options.inverse(movieOrShow)
  }

  if (!user.watchlist) {
    return options.inverse(movieOrShow)
  }

  if (!user.watchlist.isOnWatchlist(movieOrShow)) {
    return options.inverse(movieOrShow)
  }

  // at this point: no need to pass any data back to the view
  // we only show static HTML, no data needed
  return options.fn()
}
