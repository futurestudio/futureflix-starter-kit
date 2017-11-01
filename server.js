'use strict'

const Hapi = require('hapi')
const Path = require('path')

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
      plugin: require('./server/add-user-to-views')
    },
    {
      plugin: require('./server/user-profile')
    }
  ])
  .then(() => {
    const viewsPath = Path.resolve(__dirname, 'public', 'views')

    server.views({
      engines: {
        hbs: require('handlebars')
      },
      path: viewsPath,
      layoutPath: Path.resolve(viewsPath, 'layouts'),
      layout: 'layout',
      partialsPath: Path.resolve(viewsPath, 'partials'),
      isCached: process.env.NODE_ENV === 'production',
      context: {
        title: 'Futureflix'
      }
    })

    // start your server
    server.start().catch(err => {
      throw err
    })
  })
  .catch(err => {
    throw err
  })
