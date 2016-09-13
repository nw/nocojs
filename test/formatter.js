'use strict'

const test = require('tape')

const formatters = require('../lib/formatters')
const transcribe = require('./fixtures/transcribe.json')
const phonecall = require('./fixtures/phonecall.json')

test('phoneMessage', function (t) {

  const result = formatters.phoneMessage(transcribe, phonecall)

  t.equal(result.type, 'voicemail')
  t.equal(result.num, '+15555555555')
  t.equal(result.audio, 'https://api.twilio.com/2010-04-01/Accounts/ACc438d93084070c229ce80b7e3497a624/Recordings/RE605548e79d66ab2232bf8c7e5dbaf4ca')

  console.log(result)
  t.end()

})

