var debug = require('debug')('comics:issue-processor')
  , co = require('co')
  , _ = require('lodash')
  , unglob = require('unglob')

function IssueProcessor(file, done) {
  'use strict';
  var path = require('path')
    , db = require('../../config/db')
    , Issue = db.models.issue
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

        var files = yield unglob.directory(
          ['**/*.png', '**/*.jpg', '**/*.jpeg'],
          issuePath
        )

        var pageCreators = _.map(files.sort(), function (file, pageNumber) {
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
      path: issuePath
    })
  }
}

module.exports = IssueProcessor

function coCreate(model, attributes) {
  return function (cb) {
    model.create(attributes).exec(cb)
  }
}