'use strict'

const Hapi = require('hapi')
const Path = require('path')

// create new server instance
const server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: 'localhost',
  port: process.env.PORT || 3000
})

// register plugins to server instance
server.register([
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
    register: require('./server/add-user-to-views')
  },
  {
    register: require('./server/user-profile')
  },
], err => {
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
