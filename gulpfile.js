var gulp = require('gulp');
var config = require('./config/config');
var del = require('del');
var runSequence = require('run-sequence');

require('require-dir')('./tasks');

gulp.task('clean', function(cb){
    del.sync([config.dist]);
    cb();
});

gulp.task('dev', function() {
  runSequence(
    'build'
    , 'serve'
	);
});

gulp.task('build', function() {
	runSequence(
    'clean',
    'quality',
		['assets',  'riot', 'template', 'scripts'],
		'styles'
	);
});

gulp.task('quality', function() {
  runSequence(
    ['test', 'lint', 'style-lint']
	);
});

gulp.task('deploy', function() {
  runSequence(
    'build',
    'git'
	);
});
