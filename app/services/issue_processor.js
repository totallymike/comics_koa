var db = require('../../config/db')
  , Issue = db.models.issue
  , debug = require('debug')('comics:issue-processor')
  , co = require('co')
  , _ = require('lodash')
  , fs = require('co-fs-plus')

function IssueProcessor(file, done) {
  'use strict';
  var path = require('path')
    , Page = db.models.page

  var issuePath = path.join(process.env.DATA_DIR, file.name)

  if (file.name.match(/cbz$/i)) {
    debug('Unzipping %s', file.name)
    let DecompressZip = require('decompress-zip')
    let unzipper = new DecompressZip(file.path)

    unzipper.on('error', function (err) {
      debug('ERROR: %s', err)
      done(err)
    })

    unzipper.on('extract', function () {
      debug('succeeded in extraction')
      co(function* () {
        var issue = yield coCreate(Issue, {filename: file.name})

        var files = yield fs.walk(issuePath, {
          filterFilename: function (name) {
            return name.match(/(png|jpg|jpeg|gif)$/i)
          }
        })

        var pageCreators = _.map(files, function (file, pageNumber) {
          return coCreate(Page, {
            filename: file,
            pageNumber: pageNumber,
            issue: issue.id
          })
        })
        var pages = yield pageCreators
        return [null, [issue, pages]]
      })(done)
    })

    unzipper.extract({
      path: issuePath,
      filter: function (file) {
        return !Boolean(file.filename.match(/(png|jpg|jpeg|gif)$/i))
      }
    })
  }
}

module.exports = IssueProcessor

function coCreate(model, attributes) {
  return function (cb) {
    model.create(attributes).exec(cb)
  }
}