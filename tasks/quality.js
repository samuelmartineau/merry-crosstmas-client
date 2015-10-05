var gulp = require('gulp');
var path = require('path');
var config = require('../config/config');
var gulpSassLint = require('gulp-sass-lint');
var eslint = require('gulp-eslint');
var gIf = require('gulp-if');
var tape = require('gulp-tape');

function isAppScript(file) {
    return file.path.indexOf('node_modules') < 0;
}

gulp.task('lint', function() {
    gulp.src(path.join(config.src, 'scripts', '**', '*.js'))
        .pipe(gIf(isAppScript, eslint())) // Exclude third part libraries from linting
        .pipe(eslint.format())
        .pipe(gIf(config.isProd, eslint.failOnError()));
});

gulp.task('style-lint', function() {
    gulp.src([path.join(config.src, 'styles', '**', '*.s+(a|c)ss'), path.join('!' + config.src, 'styles', 'common', 'iconfont.s+(a|c)ss')])
        .pipe(gulpSassLint({
            config: '.sass-lint.yml'
        }))
        .pipe(gulpSassLint.format())
        .pipe(gIf(config.isProd, gulpSassLint.failOnError()))
});

gulp.task('test', function() {
    gulp.src(path.join(config.test.directory, config.test.files))
        .pipe(tape());
});
