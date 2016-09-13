'use strict'

module.exports = { 
  phoneMessage: phoneMessage,
  textMessage: textMessage,
  _normalizeCaller: _normalizeCaller,
  _getMedia: _getMedia
}

function phoneMessage (payload, meta) {
  return {
    ts: Date.now(),
    type: 'voicemail',
    title: _normalizeCaller(meta),
    text: payload.TranscriptionText,
    audio: payload.RecordingUrl,
    num: payload.From
  }
}

function textMessage (payload) {
  return {
    ts: Date.now(),
    type: 'sms',
    title: _normalizeCaller(payload),
    text: payload.Body,
    media: _getMedia(payload),
    num: payload.From
  }
}

function _normalizeCaller (meta) {
  let from = (meta.CallerName)
    ? meta.CallerName + ' - ' + meta.From
    : meta.From

  return from + ' ( ' +
      meta.FromCity + ', ' + meta.FromState + ' ' + meta.FromZip + ' )'
}

function _getMedia (payload) {
  let media = []
    , mediaCount = parseInt(payload.NumMedia) || 0
    , idx = 0

  for (; idx < mediaCount; idx++) {
    media.push(payload['MediaUrl' + idx])
  }
  return media
}
