'use strict'

const path = require('path')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const responseTime = require('response-time')

module.exports = function config (app) {
  app.disable('x-powered-by')

  switch (app.get('env')) {
    case 'production':
      app
        .enable('prod')
        .enable('view cache')
        .disable('debug')
        .enable('compress')
      break
    default:
      app
        .set('domain', 'http://localhost:3333')
        .enable('dev')
        .enable('debug')
        .disable('compress')
      break
  }

  app
    .set('port', 3333)
    .set('root', path.join(__dirname, '/../'))
    .set('APP_DOMAIN', process.env.APP_DOMAIN || 'http://localhost:3333')

    .use(compression())
    .use(responseTime({ digits: 3 }))
    .use(cookieParser())

  return app
}
