var debug = require('debug')('comics:issue-processor')
  , co = require('co')
  , _ = require('lodash')
  , unglob = require('unglob')

function IssueProcessor(file, done) {
  'use strict';
  var path = require('path')
    , mongoose = require('mongoose')
    , Issue = mongoose.model('Issue')
    , Page = mongoose.model('Page')

  debug(require('util').inspect(file))
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
        var issue = yield Issue.create({number: file.number, path: file.name})

        var files = yield unglob.directory(
          ['**/*.png', '**/*.jpg', '**/*.jpeg'],
          issuePath
        )

        var pageCreators = _.map(files.sort(), function (filePath, pageNumber) {
          Page.create({
            filePath: filePath,
            number: pageNumber,
            issue: issue._id
          })
        })

        var pages = yield pageCreators

        require('fs').unlink(file.path, function (err) {
          if (err) {
            debug(err)
          } else {
            debug('%s deleted.', file.path)
          }
        })

        return [null, [issue, pages]]
      })(done)
    })

    unzipper.extract({
      path: issuePath
    })
  }
}

module.exports = IssueProcessor
