'use strict'

// import environment variables from local secrets.env file
const Fs = require('fs')
const Path = require('path')
const Dotenv = require('dotenv')
Dotenv.config({ path: Path.resolve(__dirname, '..', 'secrets.env') })

const Models = require(Path.resolve(__dirname, '..', 'server', 'models'))
const Movie = Models.Movie
const Show = Models.Show

function pumpItUp() {
  console.log('Importing data 📺 👌')
}

function destroyDB() {
  console.log('Au revior data 😢 🔥')
}

if (process.argv.includes('--destroy')) {
  destroyDB()
} else {
  pumpItUp()
}
