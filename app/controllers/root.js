var Resource = require('koa-resource-router')

module.exports = new Resource({
  index: [
    function *(next) {
      var Issue = require('mongoose').model('Issue')

      this.issues = yield Issue.find().lean().limit(10).exec()
      yield next
    },
    function *() {
      yield this.render('index', {issues: this.issues})
    }
  ]
})