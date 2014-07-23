var Waterline = require('waterline')

module.exports = Waterline.Collection.extend({
  identity: 'page',
  connection: 'postgresql',

  attributes: {
    filename: 'string',
    issue: {
      model: 'issue'
    }
  }
})
