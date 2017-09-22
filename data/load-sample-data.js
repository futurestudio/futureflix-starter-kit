'use strict'

const Fs = require('fs')
const _ = require('lodash')
const Path = require('path')
const Listr = require('listr')
const Dotenv = require('dotenv')

// import environment variables from local secrets.env file
Dotenv.config({ path: Path.resolve(__dirname, '..', 'secrets.env') })

// import models
const Models = require(Path.resolve(__dirname, '..', 'server', 'models'))
const Movie = Models.Movie
const Show = Models.Show

// read movies and TV show sample data as JSON
const Movies = JSON.parse(
  Fs.readFileSync(Path.resolve(__dirname, 'movies.json'), 'utf8')
)
const Shows = JSON.parse(
  Fs.readFileSync(Path.resolve(__dirname, 'shows.json'), 'utf8')
)

/**
 * Load Futureflix sample movies and TV shows into MongoDB
 *
 * This method deletes existing data before importing the
 * samples. Be careful here, there’s no approval question
 * before deletion.
 *
 * @return {Array} tasks for listr
 */
function pumpItUp () {
  return _.concat(
    // add task to remove data before import to avoid errors
    destroyDB(),
    // the actual task to import data
    [
      {
        title: 'Importing movies and TV shows 📺 👌',
        task: (ctx, task) => {
          task.output = 'Importing movies'

          // import movies …
          return Movie.insertMany(Movies).then(() => {
            // … then TV shows
            task.output = 'Importing TV shows'
            return Show.insertMany(Shows)
          })
        }
      }
    ]
  )
}

/**
 * Delete all Futureflix movies and TV shows from MongoDB
 *
 * @return {Array} tasks for listr
 */
function destroyDB () {
  return [
    {
      title: 'Au revior existing data 😢 🔥',
      skip: () => Movie.findOne().then(movie => {
        // skip task if no movie is available
        return !movie
      }),
      task: (ctx, task) => {
        task.output = 'Deleting movies'

        // delete movies …
        return Movie.remove().then(() => {
          // … then TV shows
          task.output = 'Deleting TV shows'
          return Show.remove()
        })
      }
    }
  ]
}

/**
 * Start tasks to prepare or destroy data in MongoDB
 *
 * @param  {Listr} tasks  Listr instance with tasks
 * @return {void}
 */
function kickoff (tasks) {
  tasks
    .run()
    .then(process.exit)
    .catch(process.exit)
}

/**
 * Entry point for the NPM "pumpitup" and "cleanup" scripts
 * Imports movie and TV show sample data to MongoDB
 */
if (process.argv.includes('--destroy')) {
  const cleanUp = destroyDB()
  kickoff(new Listr(cleanUp))
} else {
  const pumpIt = pumpItUp()
  kickoff(new Listr(pumpIt))
}
