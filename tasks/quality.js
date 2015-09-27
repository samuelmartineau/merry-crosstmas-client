var gulp = require('gulp');
var path = require('path');
var config = require('../config');
var gulpSassLint = require('gulp-sass-lint');

gulp.task('quality', ['style-lint']);


gulp.task('style-lint', function() {
    return gulp.src(path.join(config.src, 'styles', '**', '*.s+(a|c)ss'))
        .pipe(gulpSassLint({
          config: '.sass-lint.yml'
        }))
        .pipe(gulpSassLint.format())
        .pipe(gulpSassLint.failOnError())
});
