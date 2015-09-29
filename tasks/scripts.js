var gulp = require('gulp');
var path = require('path');
var config = require('../config');
var fs = require('fs');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var gIf = require('gulp-if');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('scripts', function() {
    return browserify({ entries: [path.join(config.src, 'scripts', 'main.js')] })
       .bundle()
       .pipe(gIf(config.isProd, uglify()))
       .pipe(source(config.scriptName))
       .pipe(gulp.dest(path.join(config.dist, 'scripts')));
});
