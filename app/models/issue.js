var Waterline = require('waterline')

var Issue = Waterline.Collection.extend({

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

module.exports = Issue