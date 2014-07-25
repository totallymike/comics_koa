var Resource = require('koa-resource-router')

module.exports = new Resource({
  index: [
    function *(next) {
      var Issue = this.models.issue
      this.issues = yield this.coFind(Issue, {limit: 10})
      yield next
    },
    function *() {
      yield this.render('index', {issues: this.issues})
    }
  ]
})