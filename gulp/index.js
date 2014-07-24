var fs = require('fs')
  , path = require('path')

var scriptFilter = function (name) {
  return /(\.(js)$)/i.test(path.extname(name))
}

fs.readdirSync(path.join('.', 'gulp', 'tasks')).filter(scriptFilter).forEach(function (task) {
  var taskName = path.basename(task, path.extname(task))
  require('./tasks/' + taskName)
})
