'use strict'

const path = require('path')
const twilio_endpoints = require('./twilio_endpoints')
const serveStatic = require('serve-static')
const storage = require('../lib/store')

module.exports = function routes (app) {

  // json response for the front-end UI
  app.get('/messages', function (req, res) {
    return res.status(200).send(storage.getAll())
  })

  // all the routes for managing the twilio webhook API
  app.use(twilio_endpoints(app))

  // host `public` dir as static files.
  // `index.html` is a static page (default url)
  app.use(serveStatic(path.join(__dirname, '/../public'), {
    maxAge: app.enabled('debug') ? 0 : 100000000
  }))

}
