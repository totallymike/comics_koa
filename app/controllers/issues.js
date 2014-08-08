var Resource = require('koa-resource-router')
  , koaBody = require('koa-better-body')
  , issueQueue = require('../workers/issue')

var issues = new Resource('issues', {
  new: function *() {
    yield this.render('issues/new')
  },
  create: [
    koaBody({
      multipart: true
    }),
    function *(next) {
      var issueQueue = require('../workers/issue')
      var uploadedFile = this.request.body.files.filename
        , fields = this.request.body.fields
      var file = {
        name: uploadedFile.name,
        path: uploadedFile.path,
        number: fields.number
      }

      issueQueue.add({file: file})
      this.redirect('/')
      yield next
    }
  ],
  show: function *() {
    var mongoose = require('mongoose')
      , Page = mongoose.model('Page')

    var pages = yield Page.find({issue: this.params.issue}).lean()
                          .select('number')
                          .sort('number')
                          .exec()

    yield this.render('issues/show', {
      issue: this.params.issue,
      pages: pages
    })
  }
})

module.exports = issues