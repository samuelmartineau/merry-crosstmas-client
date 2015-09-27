var gulp = require('gulp');
var path = require('path');
var config = require('../config');

gulp.task('assets', function() {
	return gulp.src(path.join(config.src, 'assets', '**'))
		.pipe(gulp.dest(path.join(config.dist, 'assets')));
});
