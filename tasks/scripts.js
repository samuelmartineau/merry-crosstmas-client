var gulp = require('gulp');
var path = require('path');
var config = require('../config');
var fs = require('fs');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var gIf = require('gulp-if');

gulp.task('scripts', ['verify'], function() {
    return gulp.src(config.getScripts())
        .pipe(plumber(config.plumber))
        .pipe(concat(config.scriptName))
        .pipe(gIf(config.prod, uglify()))
        .pipe(gulp.dest(path.join(config.dist, 'scripts')));
});

gulp.task('verify', function(cb) {
    var scripts = config.getScripts(),
        missedFiles = [],
        everyScriptsExists = scripts.every(function(file) {
            var fileExist = fs.existsSync(file);
            if (!fileExist) {
                missedFiles.push(file);
            }
            return fileExist;
        });

    if (!everyScriptsExists) {
        cb(new gutil.PluginError('verify task', '\033[31mError you don\'t have these scripts:' + missedFiles));
        process.exit(1);
    } else {
        cb();
    }
});
