'use strict'

const Mongoose = require('mongoose')
const Movie = require('./movie')
const Show = require('./show')

// tell Mongoose to use ES6 promises
Mongoose.Promise = global.Promise

// Connect to your database
Mongoose.connect(process.env.DATABASE)

// listen for connection errors and print the message
Mongoose.connection.on('error', err => {
  console.error(`⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨  → ${err.message}`)
})

// use ES6 shorthands: "propertyName: variableName" equals "propertyName"
module.exports = {
  Movie,
  Show
}
