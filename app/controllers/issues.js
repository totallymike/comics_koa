var Resource = require('koa-resource-router')
  , koaBody = require('koa-better-body')
  , issueQueue = require('../workers/issue')

module.exports = new Resource('issues', {
  new: function *() {
    yield this.render('issues/new')
  },
  create: [
    koaBody({
      multipart: true,
    }),
    function *(next) {
      issueQueue.add({file: this.request.body.files.filename})
      this.redirect('/')
      yield next
    }
  ]
})