var gulp = require('gulp')
  , debug = require('debug')('gulp')
  , nodemon = require('gulp-nodemon')

gulp.task('watch', function () {
  var livereload = require('gulp-livereload')
  livereload.listen()

  gulp.watch('app/assets/javascripts/**', ['lint:client', 'browserify'])
  gulp.watch('app/assets/stylesheets/**', ['less'])
  gulp.watch('public/**').on('change', livereload.changed)

  nodemon({
    script: './bin/www',
    watch: ['./app', 'app.js'],
    ignore: ['./app/assets'],
    cwd: process.cwd(),
    env: {'DEBUG': 'comics:*'},
    nodeArgs: ['--harmony']
  }).on('change', ['lint:app'])
    .on('restart', function () {
      debug('Restarted app')
    })
    .on('restart', livereload.changed)
    .on('message', function (message) {
      console.log(message)
    })
})
