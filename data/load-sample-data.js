'use strict'

const Fs = require('fs')
const _ = require('lodash')
const Path = require('path')
const Listr = require('listr')
const Dotenv = require('dotenv')

// import environment variables from local secrets.env file
Dotenv.config({ path: Path.resolve(__dirname, '..', 'secrets.env') })

// import models
const Models = require(Path.resolve(__dirname, '..', 'models'))
const Show = Models.Show
const Movie = Models.Movie
const Season = Models.Season
const Episode = Models.Episode

// read movies and TV show sample data as JSON
const Movies = JSON.parse(Fs.readFileSync(Path.resolve(__dirname, 'movies.json'), 'utf8'))
const Shows = JSON.parse(Fs.readFileSync(Path.resolve(__dirname, 'shows.json'), 'utf8'))

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

    // the actual tasks to import data
    [
      {
        title: 'Importing movies and TV shows 📺 👌',
        task: async (ctx, task) => {
          // show explicit output for the two step process:
          // first movies, second TV shows
          task.output = 'Importing movies'

          // import movies …
          await Movie.insertMany(Movies)

          // … then TV shows
          task.output = 'Importing TV shows'
          await Show.insertMany(Shows)
        }
      },
      {
        title: 'Importing seasons and episodes for TV shows',
        task: (ctx, task) => {
          task.output = 'Importing seasons'

          const promises = Shows.map(async show => {
            await Season.insertMany(show.seasons)

            return show.seasons.map(season => {
              return Episode.insertMany(season.episodes)
            })
          })

          task.output = 'Importing episodes'
          return Promise.all(promises)
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
      skip: async () => {
        const movie = await Movie.findOne()
        // skip task if no movie is available
        return !movie
      },
      task: async (ctx, task) => {
        // delete movies …
        task.output = 'Deleting movies'
        await Movie.remove()

        // … then episodes
        task.output = 'Deleting episodes'
        await Episode.remove()

        // … then seasons
        task.output = 'Deleting seasons'
        await Season.remove()

        // … then TV shows
        task.output = 'Deleting TV shows'
        await Show.remove()
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
async function kickoff (tasks) {
  await tasks.run()
  process.exit()
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
