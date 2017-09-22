'use strict'

const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const showSchema = new Schema({
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
    tvdb: Number,
    tmdb: Number,
    fanart: Number,
    tvrage: Number
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
  genres: [ String ],
  language: String,
  certification: String,
  network: String,
  country: String
})

module.exports = Mongoose.model('Show', showSchema)
