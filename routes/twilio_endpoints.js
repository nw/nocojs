'use strict'

const router = require('express').Router()
  , methodOverride = require('method-override')
  , bodyParser = require('body-parser')
  , twilio = require('twilio')
  , store = require('../lib/store') // simple store

module.exports = function (app) {

  // Holds metadata about calls so they can be linked to the transcript callback
  const calls = {}

  router
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
    .use(bodyParser.json()) // parse application/json

  // twilio calls this when an incoming call matches your number
  router.post('/phone/incoming', function (req, res) {

    console.log('incoming call')

    if (req.body && req.body.RecordingSid) {
      calls[req.body.RecordingSid] = req.body
    }

    var dialog = new twilio.TwimlResponse()
      .pause(1)
      .say('Welcome to Northern Colorado JavaScript!')
      .pause(1)
      .say('Please leave a message after the beep')
      .record({
        timeout: 5,
        finishOnKey: '123456789#',
        maxLength: 60,
        transcribe: true,
        transcribeCallback: (app.get('domain') + '/phone/message/transcribe'),
        playBeep: true,
        trim: 'trim-silence'
      })

    res.status(200).send(dialog.toString())

  })

  // twilio will use this to return the transcribed message
  router.post('/phone/message/transcribe', function (req, res, next) {

    console.log('transcribed message')

    let meta = {}

    if (req.body && req.body.RecordingSid) {
      meta = calls[req.body.RecordingSid]
      delete calls[req.body.RecordingSid]
    } else {
      // We should exit early if we don't have a record of the call.
      return res.status(500).send({ok: true})
    }

    store.set('call', req.body, meta)

    res.status(200).send({ok: true})

  })

  // handler for incoming sms text messages
  router.post('/sms/incoming', function (req, res, next) {

    console.log('incoming sms')

    if (!req.body || !req.body.From) {
      return res.status(500).send({ok: true}) // invalid payload
    }

    store.set('sms', req.body)

    res.status(200).send({ok: true})

  })

  // make sure we return the router
  return router

}
