var gulp = require('gulp')
  , browserify = require('browserify')
  , notify = require('gulp-notify')
  , source = require('vinyl-source-stream')

var handleError = function () {
  var args = Array.prototype.slice.call(arguments)
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args)

  this.emit('end')
}

var bundler = browserify('./app/assets/javascripts/application.js')

gulp.task('browserify', ['lint:client'], function () {
  bundler.bundle()
         .on('error', handleError)
         .pipe(source('app.js'))
         .pipe(gulp.dest('public/js'))

})
