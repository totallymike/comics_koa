var Waterline = require('waterline')

var Page = Waterline.Collection.extend({
  identity: 'page',
  connection: 'postgresql',

  attributes: {
    filename: 'string',
    pageNumber: 'integer',
    issue: {
      model: 'issue'
    }
  }
})

module.exports = Page