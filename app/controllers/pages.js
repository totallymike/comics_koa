var Resource = require('koa-resource-router')

var pages = new Resource('pages', {
  show: function *(next) {
    var Page = this.models.page
    var page = yield Page.findOne()
                         .where({issue: this.params.issue, pageNumber: this.params.page})

    yield this.render('pages/show', {page: page})
    yield next
  }
})

module.exports = pages