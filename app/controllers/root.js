var Resource = require('koa-resource-router')

module.exports = new Resource({
  index:  function *() {
    yield this.render('index', {issues: []})
  }
})