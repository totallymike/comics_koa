var gulp = require('gulp')
  , Q = require('q')

gulp.task('bower', function () {
  var exec = require('child_process').exec
    , deferred = Q.defer()

  exec('bower install', function (err) {
    if (err) {
      deferred.reject(err)
    }
    deferred.resolve()
  })

  return deferred.promise
})
