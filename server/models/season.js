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
      tvrage: Number,
      show: { type: Number, ref: 'Show' }
    },
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

//
seasonSchema.virtual('episodes', {
  ref: 'Episode',
  localField: 'ids.trakt',
  foreignField: 'ids.season'
})

function autopopulate (next) {
  this.populate('episodes')
  next()
}

seasonSchema.pre('find', autopopulate)
seasonSchema.pre('findOne', autopopulate)

module.exports = Mongoose.model('Season', seasonSchema)
