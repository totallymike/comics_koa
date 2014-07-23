var Resource = require('koa-resource-router')

module.exports = new Resource('issues', {
  new: function *(next) {
    yield this.render('issues/new')
  }
})