var Resource = require('koa-resource-router')

var pages = new Resource('pages', {
  show: function *(next) {
    var Page = this.models.page
    var page = yield Page.findOne()
                         .where({issue: this.params.issue})
                         .where({pageNumber: this.params.page})
                         .populate('issue')
    yield this.render('pages/show', {page: page, issue: page.issue})
    yield next
  }
})

module.exports = pages