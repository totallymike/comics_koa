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

var initDb = function () {
  return function(callback) {
    orm.initialize(config, function (err, ontology) {
      if (err) {
        throw err
      }
      orm.models = ontology.collections
      callback(null, ontology)
    })
  }
}

module.exports = orm
module.exports.initDb = initDb
