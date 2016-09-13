'use strict'

const test = require('tape')
const request = require('supertest')
const app = require('../app')

test('route', function route (t) {
  request(app)
    .get('/')
    .expect(200, t.end)
})
