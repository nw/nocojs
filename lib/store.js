'use strict'

const formatters = require('./formatters')
const storage = []

module.exports = {

  set: function (type, payload, meta) {

    let msg = (type === 'call')
      ? formatters.phoneMessage(payload, meta)
      : formatters.textMessage(payload)

    storage.push(msg)
  },

  getAll: function () {
    return storage
  }

}
