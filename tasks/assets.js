var gulp = require('gulp');
var path = require('path');
var config = require('../config/config');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var gIf = require('gulp-if');

gulp.task('assets', ['images', 'favicon']);


gulp.task('images', function() {
    return gulp.src(path.join(config.src, 'assets', 'images', '**', '*'))
        .pipe(gIf(config.isProd, imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant(), mozjpeg({
                quality: 70
            })]
        })))
        .pipe(gulp.dest(path.join(config.dist, 'assets', 'images')));
});

gulp.task('favicon', function() {
    return gulp.src(path.join(config.src, 'assets', '*.ico'))
        .pipe(gulp.dest(path.join(config.dist, 'assets')));
});
