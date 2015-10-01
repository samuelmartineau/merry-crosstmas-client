var gulp = require('gulp');
var path = require('path');
var config = require('../config/config');
var uglify = require('gulp-uglify');
var gIf = require('gulp-if');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('scripts', function() {
    return browserify({
            entries: [path.join(config.src, 'scripts', 'main.js')],
            debug : !config.isProd
        })
        .bundle()
        .pipe(source(config.scriptName))
        .pipe(gIf(config.isProd, buffer()))
        .pipe(gIf(config.isProd, uglify()))
        .pipe(gulp.dest(path.join(config.dist, 'scripts')));
});
