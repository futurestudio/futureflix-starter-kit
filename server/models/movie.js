'use strict'

const Mongoose = require('mongoose')
const MongooseRandom = require('mongoose-simple-random')
const Schema = Mongoose.Schema

const movieSchema = new Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  ids: {
    trakt: Number,
    slug: String,
    imdb: String,
    tmdb: Number,
    fanart: Number,
    omdb: Number
  },
  images: {
    poster: String,
    background: String
  },
  year: Number,
  tagline: String,
  overview: String,
  released: String,
  runtime: Number, // in minutes
  trailer: String,
  homepage: String,
  rating: Number,
  votes: Number,
  genres: [String],
  language: String,
  certification: String
})

// add plugin to find random movies
movieSchema.plugin(MongooseRandom)

movieSchema.statics.random = function (limit) {
  const self = this

  return new Promise((resolve, reject) => {
    self.findRandom({}, {}, { limit }, (err, results) => {
      if (err) {
        return reject(err)
      }

      return resolve(results)
    })
  })
}

module.exports = Mongoose.model('Movie', movieSchema)
