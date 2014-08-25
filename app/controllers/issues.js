var Resource = require('koa-resource-router')
  , koaBody = require('koa-better-body')
  , mongoose = require('mongoose')
  , debug = require('debug')('comics:app')
  , _ = require('lodash')

var issues = new Resource('issues', {
  index: function *() {
    var Issue = mongoose.model('Issue')
      , issues = yield Issue.find().limit(10).exec()
    debug(this.request)
    this.body = {'issue': issues}
  },
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
  edit: [
    function *(next) {
      var Issue = mongoose.model('Issue')
      this.issue = yield Issue.findById(this.params.issue).exec()
      yield next
    },
    function *() {
      yield this.render('issues/edit', {
        issue: this.issue
      })
    }
  ],
  update: [koaBody(), function *(next) {
    debug(this.request.body)
    debug(this.params)
    yield next
  }],
  show: function *() {
    var mongoose = require('mongoose')
      , Page = mongoose.model('Page')

    var issue = yield mongoose.model('Issue').findById(this.params.issue).lean().exec()
    var pages = yield Page.find({issue: this.params.issue}).lean()
                          .select('_id')
                          .sort('number')
                          .exec()

    if (this.request.accepts('json')) {
      var pageIds = _.map(pages, function (page) { return page._id })
      var foo = issue
      foo.pages = pageIds
      this.body = { issue: foo }
    } else {
      debug('not json!')
      yield this.render('issues/show', {
        issue: this.params.issue,
        pages: pages
      })
    }
  }
}, {
  methods: {
    update: 'POST'
  }
})

module.exports = issues
