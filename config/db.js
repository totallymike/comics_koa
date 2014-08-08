var mongoose = require('mongoose')
  , debug = require('debug')('comics:db')

var db = mongoose.connection
db.on('error', debug.bind(debug, 'error: %s'))

db.once('open', function dbCallback() {
  debug('Connection opened')
})

require('../app/models')

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/comics')

module.exports = mongoose