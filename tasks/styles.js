var gulp = require('gulp');
var path = require('path');
var gIf = require('gulp-if');
var config = require('../config/config');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

gulp.task('styles', function() {
		gulp.src(path.join(config.src, 'styles', 'main.scss'))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['ie >= 9', 'last 2 versions']
		}))
		.pipe(gIf(config.isProd, minifyCss()))
		.pipe(gulp.dest(path.join(config.dist, 'styles')));
});
