var gulp = require('gulp')
  , changed = require('gulp-changed')
  , glob = require('glob')
  , less = require('gulp-less')
  , path = require('path')
  , Q = require('q')

gulp.task('less', function () {
  var deferred = Q.defer()

  glob('bower_components/**/less', function (err, files) {
    var paths = files.concat(path.join(global.ASSETS_LESS, 'includes'))

    gulp.src(global.ASSETS_LESS + '/style.less')
        .pipe(changed(global.PUBLIC_CSS, {extension: '.css'}))
        .pipe(less({ paths: paths }))
        .pipe(gulp.dest(global.PUBLIC_CSS))

    deferred.resolve()
  })

  return deferred.promise
})
