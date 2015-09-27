var gulp = require('gulp');
var config = require('./config');
var del = require('del');

require('require-dir')('./tasks');

gulp.task('clean', function(cb){
    del.sync([config.dist]);
    cb();
});

gulp.task('dev', ['serve']);

gulp.task('build', ['clean', 'quality', 'assets', 'style', 'riot', 'template']);
