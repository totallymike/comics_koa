var gulp = require('gulp')

gulp.task('watch', function () {
  var livereload = require('gulp-livereload')
  livereload.listen()

  gulp.watch(global.APP_LINT_PATHS, ['lint:app'])
  gulp.watch('app/assets/javascripts/**', ['lint:client', 'browserify'])
  gulp.watch('app/assets/stylesheets/**', ['less'])
  gulp.watch('public/**').on('change', livereload.changed)
})
