var gulp = require('gulp');
var path = require('path');
var config = require('../config');
var gulpSassLint = require('gulp-sass-lint');
var eslint = require('gulp-eslint');

gulp.task('quality', ['style-lint']);

function isAppScript(file) {
    return file.path.indexOf('node_modules') < 0;
}

gulp.task('lint', function () {
    return gulp.src(config.getScripts())
        .pipe(gIf(isAppScript, eslint())) // Exclude third part libraries from linting
        .pipe(eslint.format())
        .pipe(gIf(config.prod, eslint.failOnError()));
});

gulp.task('style-lint', function() {
    return gulp.src(path.join(config.src, 'styles', '**', '*.s+(a|c)ss'))
        .pipe(gulpSassLint({
          config: '.sass-lint.yml'
        }))
        .pipe(gulpSassLint.format())
        .pipe(gulpSassLint.failOnError())
});
