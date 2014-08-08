var Resource = require('koa-resource-router')

var pages = new Resource('pages', {
  show: function *(next) {
    var Page = require('mongoose').model('Page')
    var page = yield Page.findOne()
                         .where({issue: this.params.issue})
                         .where({number: this.params.page})
                         .populate('issue')
                         .exec()
    var nextPage = yield page.nextPage().lean().select('number').exec()

    yield this.render('pages/show', {
      page: page,
      issue: page.issue,
      nextPage: nextPage
    })
    yield next
  }
})

module.exports = pages