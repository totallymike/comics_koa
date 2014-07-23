var Waterline = require('waterline')

module.exports = Waterline.Collection.extend({
  identity: 'issue',
  connection: 'postgresql',

  attributes: {
    filename: 'string',
    pages: {
      collection: 'page',
      via: 'issue'
    }
  }
})
