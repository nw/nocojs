/* global $:true */

var moment = require('moment')

$(document).ready(function () {

  var tbody = $('#tbody')

  update()
  setInterval(update, 5000)

  function update () {

    $.get('/messages', function (data) {
      tbody.empty()

      data.forEach(function (row) {

        var el = $(
         '<tr>' +
           '<td>' + moment(row.ts).fromNow() + '</td>' +
           '<td>' + row.type + '</td>' +
           '<td>' + row.title + '</td>' +
           '<td>' + row.text + '</td>' +
           '<td>' + ((row.audio) ? '<a href="' + row.audio + '">link</a>' : '&nbsp;') + '</td>' +
         '</tr>')

        tbody.append(el)

      })

    })

  }

})
