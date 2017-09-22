'use strict'

const Mongoose = require('mongoose')
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
  poster: String,
  banner: String,
  fanart: String,
  logo: String,
  thumb: String,
  year: Number,
  tagline: String,
  overview: String,
  released: String,
  runtime: Number, // in minutes
  trailer: String,
  homepage: String,
  rating: Number,
  votes: Number,
  genres: [ String ],
  language: String,
  certification: String
})

module.exports = Mongoose.model('Movie', movieSchema)
