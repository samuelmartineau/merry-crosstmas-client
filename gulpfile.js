var gulp = require('gulp');
var config = require('./config');
var del = require('del');

require('require-dir')('./tasks');

gulp.task('clean', function(cb){
    del.sync([config.dist]);
    cb();
});

gulp.task('dev', ['serve']);

gulp.task('build', ['clean', 'quality', 'assets', 'scripts', 'styles', 'riot', 'template']);

gulp.task('quality', ['test', 'lint', 'style-lint']);
