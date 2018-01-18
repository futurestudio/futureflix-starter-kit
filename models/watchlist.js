'use strict'

const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const watchlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId },
  movies: [{ type: Schema.Types.ObjectId }],
  shows: [{ type: Schema.Types.ObjectId }]
})

/**
 * Middleware
 */
// helper function to populate movies and shows on queries
// TODO

/**
 * Model Instance Methods
 */
watchlistSchema.methods.addMovie = function (movie) {
  if (!this.includesMovie(movie)) {
    this.movies.push(movie)
  }
}

watchlistSchema.methods.includesMovie = function (candidateMovie) {
  if (!candidateMovie) {
    return true
  }

  const movies = this.movies.filter(movie => {
    return movie.id === candidateMovie.id
  })

  return movies.length > 0
}

watchlistSchema.methods.addShow = function (show) {
  if (!this.includesShow(show)) {
    this.shows.push(show)
  }
}

watchlistSchema.methods.includesShow = function (candidateShow) {
  if (!candidateShow) {
    return true
  }

  const shows = this.shows.filter(show => {
    return show.id === candidateShow.id
  })

  return shows.length > 0
}

watchlistSchema.methods.isOnWatchlist = function (movieOrShow) {
  // TODO
}

module.exports = Mongoose.model('Watchlist', watchlistSchema)
