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

// register plugins, configure views and start the server instance
async function start () {
  // register plugins to server instance
  await server.register([
    {
      plugin: require('inert')
    },
    {
      plugin: require('vision')
    },
    {
      plugin: require('./web/authentication')
    },
    {
      plugin: require('./web/base')
    },
    {
      plugin: require('./web/movies')
    },
    {
      plugin: require('./web/tv-shows')
    },
    {
      plugin: require('./web/user-profile')
    },
    {
      plugin: require('./web/add-user-to-views')
    }
  ])

  // view configuration
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
  try {
    await server.start()
    console.log(`Server started → ${server.info.uri}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
