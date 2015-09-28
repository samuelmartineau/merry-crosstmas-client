var gulp = require('gulp');
var path = require('path');
var config = require('../config');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
	return gulp.src(path.join(config.src, 'styles', 'main.scss'))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['ie >= 9', 'last 2 versions']
		}))
		.pipe(gulp.dest(path.join(config.dist, 'styles')));
});
