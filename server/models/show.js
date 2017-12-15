'use strict'

const Mongoose = require('mongoose')
const MongooseRandom = require('mongoose-simple-random')
const Schema = Mongoose.Schema

const showSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    ids: {
      trakt: { type: Number, unique: true },
      slug: { type: String, unique: true },
      imdb: String,
      tvdb: Number,
      tmdb: Number,
      fanart: Number,
      tvrage: Number
    },
    images: {
      poster: String,
      background: String
    },
    overview: String,
    trailer: String,
    homepage: String,
    status: String,
    year: Number,
    first_aired: Date,
    airs: {
      day: String,
      time: String,
      timezone: String
    },
    aired_episodes: Number,
    rating: Number,
    votes: Number,
    runtime: Number,
    genres: [String],
    language: String,
    certification: String,
    network: String,
    country: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// add plugin to find random movies
showSchema.plugin(MongooseRandom)

showSchema.statics.random = function (limit) {
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

module.exports = Mongoose.model('Show', showSchema)
