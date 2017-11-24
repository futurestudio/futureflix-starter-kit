'use strict'

const Hapi = require('hapi')
const Path = require('path')
const Dotenv = require('dotenv')

// import environment variables from local secrets.env file
Dotenv.config({ path: Path.resolve(__dirname, 'secrets.env') })

// create new server instance
const server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000
})

// register plugins to server instance
server.register(
  [
    {
      register: require('inert')
    },
    {
      register: require('vision')
    },
    {
      register: require('./server/authentication')
    },
    {
      register: require('./server/base')
    },
    {
      register: require('./server/movies')
    },
    {
      register: require('./server/tv-shows')
    },
    {
      register: require('./server/add-user-to-views')
    },
    {
      register: require('./server/user-profile')
    }
  ],
  err => {
    if (err) {
      throw err
    }

    const viewsPath = Path.resolve(__dirname, 'public', 'views')

    server.views({
      engines: {
        hbs: require('handlebars')
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
  }
)
