'use strict'

const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const seasonSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    ids: {
      trakt: Number,
      slug: String,
      imdb: String,
      tmdb: Number,
      tvrage: Number
    },
    show: { type: Schema.Types.ObjectId, ref: 'Show' },
    number: Number,
    overview: String,
    first_aired: String,
    runtime: Number, // in minutes
    network: String,
    rating: Number,
    votes: Number,
    episode_count: Number,
    aired_episodes: Number
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

module.exports = Mongoose.model('Season', seasonSchema)
