var gulp = require('gulp');
var path = require('path');
var config = require('../config/config');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gIf = require('gulp-if');
var runSequence = require('run-sequence');

gulp.task('assets', function(){
  runSequence(
    'images',
    'favicon',
    'fonts'
	);
});


gulp.task('images', function() {
    gulp.src(path.join(config.src, 'assets', 'images', '**', '*'))
        .pipe(gIf(config.isProd, imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(path.join(config.dist, 'assets', 'images')));
});

gulp.task('favicon', function() {
    gulp.src(path.join(config.src, 'assets', '*.ico'))
        .pipe(gulp.dest(path.join(config.dist, 'assets')));
});

gulp.task('fonts', function() {
    gulp.src(path.join('config', 'fonts', '*'))
        .pipe(gulp.dest(path.join(config.dist, 'assets', 'fonts')));
});
