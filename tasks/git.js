var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var path = require('path');
var config = require('../config/config');

gulp.task('git', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      branch: 'master',
      force: true,
      message: 'release'
    }));
});
