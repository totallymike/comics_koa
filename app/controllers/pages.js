var debug = require('debug')('comics:controller:pages')
  , qs = require('qs')

var pages = function *(next) {
  var Page = require('mongoose').model('Page')
  var query = qs.parse(this.querystring)
  var page
  if (query.ids) {
    page = yield Page
      .find()
      .lean()
      .where('_id')
      .in(query.ids)
      .populate('issue_id')
      .exec()
    this.body = { page: page }
  } else {
    page = yield Page.find()
    .where(query)
    .exec()

    this.body = {page: page}
  }
  yield next
}
module.exports = pages
