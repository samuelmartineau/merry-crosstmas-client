var gulp = require('gulp');
var path = require('path');
var config = require('../config/config');
var uglify = require('gulp-uglify');
var gIf = require('gulp-if');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function() {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: path.join(config.src, 'scripts', 'main.js'),
        debug: !config.isProd
    });

    b.bundle()
        .pipe(source(config.scriptName))
        .pipe(buffer())
        // Add transformation tasks to the pipeline here.
        .pipe(gIf(config.isProd, uglify()))
        .on('error', gutil.log)
        .pipe(gulp.dest(path.join(config.dist, 'scripts')));
});
