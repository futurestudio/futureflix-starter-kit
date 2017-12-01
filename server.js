'use strict'

const Hapi = require('hapi')
const Path = require('path')
const Dotenv = require('dotenv')
const Handlebars = require('handlebars')
const HandlebarsRepeatHelper = require('handlebars-helper-repeat')

// extend handlebars instance
Handlebars.registerHelper('repeat', HandlebarsRepeatHelper)

// import environment variables from local secrets.env file
Dotenv.config({ path: Path.resolve(__dirname, 'secrets.env') })

// create new server instance and connection information
const server = new Hapi.Server({
  host: 'localhost',
  port: 3000
})

// register plugins to server instance
server
  .register([
    {
      plugin: require('inert')
    },
    {
      plugin: require('vision')
    },
    {
      plugin: require('./server/authentication')
    },
    {
      plugin: require('./server/base')
    },
    {
      plugin: require('./server/movies')
    },
    {
      plugin: require('./server/tv-shows')
    },
    {
      plugin: require('./server/user-profile')
    },
    {
      plugin: require('./server/add-user-to-views')
    }
  ])
  .then(() => {
    const viewsPath = Path.resolve(__dirname, 'public', 'views')

    server.views({
      engines: {
        hbs: Handlebars
      },
      path: viewsPath,
      layoutPath: Path.resolve(viewsPath, 'layouts'),
      layout: 'layout',
      helpersPath: Path.resolve(viewsPath, 'helpers'),
      partialsPath: Path.resolve(viewsPath, 'partials'),
      isCached: process.env.NODE_ENV === 'production',
      context: {
        title: 'Futureflix'
      }
    })

    // start your server
    server
      .start()
      .then(() => {
        console.log(`Server started → ${server.info.uri}`)
      })
      .catch(err => {
        throw err
      })
  })
