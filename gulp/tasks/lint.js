var gulp = require('gulp')
  , jshint = require('gulp-jshint')
  , Q = require('Q')

global.APP_LINT_PATHS = [
  '**/*.js',
  '!./app/assets/javascripts/**',
  '!./bower_components/**',
  '!./node_modules/**',
  '!./vendor/**',
  '!./public/js/**'
]

var linter = function (paths) {
  var deferred = Q.defer()
  gulp.src(paths)
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'))
      .on('error', function (err) {
        console.log('ERR: %s', err)
        deferred.reject(err)
      })
      .on('finish', function () {
        deferred.resolve()
      })

  return deferred.promise
}

gulp.task('lint:app', function () {
  return linter(global.APP_LINT_PATHS)
})

gulp.task('lint:client', function () {
  var paths = 'app/assets/javascripts/**/*.js'
  return linter(paths)
})

gulp.task('lint', ['lint:app', 'lint:client'])