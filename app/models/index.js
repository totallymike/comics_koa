var fs = require('fs')
  , path = require('path')
  , _ = require('lodash')

var stripExtension = function (file) {
  return path.basename(file, path.extname(file))
}

var notIndex = function (file) {
  return !file.match(/index/)
}

var files = fs.readdirSync(__dirname)

_.chain(files)
 .filter(notIndex)
 .map(stripExtension)
 .forEach(function (file) {
   require(path.join(__dirname, file))()
 })