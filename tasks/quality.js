var gulp = require('gulp');
var path = require('path');
var config = require('../config');
var gulpSassLint = require('gulp-sass-lint');
var eslint = require('gulp-eslint');
var gIf = require('gulp-if');
var tape = require('gulp-tape');
var tapSpec = require('tap-spec');

function isAppScript(file) {
    return file.path.indexOf('node_modules') < 0;
}

gulp.task('lint', function () {
    return gulp.src(path.join(config.src, 'scripts', '**', '*.js'))
        .pipe(gIf(isAppScript, eslint())) // Exclude third part libraries from linting
        .pipe(eslint.format())
        .pipe(gIf(config.isProd, eslint.failOnError()));
});

gulp.task('style-lint', function() {
    return gulp.src(path.join(config.src, 'styles', '**', '*.s+(a|c)ss'))
        .pipe(gulpSassLint({
          config: '.sass-lint.yml'
        }))
        .pipe(gulpSassLint.format())
        .pipe(gIf(config.isProd, gulpSassLint.failOnError()))
});

gulp.task('test', function () {
    return gulp.src(path.join(config.test.directory, config.test.files))
        .pipe(tape({
            reporter: tapSpec()
        }));
});
