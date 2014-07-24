var Waterline = require('waterline')
  , fs = require('fs')
  , util = require('util')
  , _ = require('lodash')

var db = require('../../config/db')

var Issue = Waterline.Collection.extend({

  identity: 'issue',
  connection: 'postgresql',

  attributes: {
    filename: 'string',
    pages: {
      collection: 'page',
      via: 'issue'
    }
  },

  processArchive: function (file, done) {
    var path = require('path')
      , Page = db.models.page

    console.log(process.env.DATA_DIR, file.name)
    var issuePath = path.join(process.env.DATA_DIR, file.name)

    console.log('STARTING %s', util.inspect(file))
    if (file.name.match(/cbz$/i)) {
      var DecompressZip = require('decompress-zip')
      var unzipper = new DecompressZip(file.path)
      unzipper.on('error', function (error) {
        done(Error(error))
      })
      console.log('made an unzipper')
      unzipper.on('extract', function () {
        console.log('extracting')
        console.log("The Function: %s", Issue.create)
        Issue.create({filename: file.name})
             .then(function (issue) {
               console.log('woo')
               unzipper.on('list', function (files) {
                 var pageRecords = _.chain(files.sort())
                                    .map(function (file, pageNumber) {
                                      return {
                                        filename: file,
                                        pageNumber: pageNumber + 1,
                                        issue: issue.id
                                      }
                                    })
                                    .value()

                 Page.create(pageRecords)
                     .then(function (pages) {
                       fs.unlink(file.path, function (err) {
                         if (err) {
                           done(err)
                         }
                         done()
                       })
                     })
               })
               unzipper.list()
             })
      })

      unzipper.extract({
        path: issuePath
      })
    }
  }
})

module.exports = Issue