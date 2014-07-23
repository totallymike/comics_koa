var Waterline = require('waterline')
  , postgresql = require('sails-postgresql')
  , _ = require('lodash')

var orm = new Waterline()
  , models = require('../app/models')

var config = {
  adapters: {
    postgresql: postgresql
  },
  connections: {
    postgresql: {
      adapter: 'postgresql',
      url: process.env.DATABASE_URL
    }
  }
}

_.forOwn(models, function (num, model) {
  orm.loadCollection(models[model])
})

orm.initialize(config, function(err, models) {
  if (err) {
    throw err
  }

  module.exports.models = models.collections
  module.exports.connections = models.connections
})