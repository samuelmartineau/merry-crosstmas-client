var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var path = require('path');
var lodash = require('lodash');
var config = require('../config/config');
var rename = require("gulp-rename");

gulp.task('iconfont', function (cb) {
    gulp.src(path.join('config', 'icons', '*.svg'))
        .pipe(iconfont({
            fontName: config.iconfont.fontName,
            svg: true,
            normalize: true,
            fontHeight: 1001
        }))
        .on('glyphs', function (glyphs, options) {
            gulp.src(path.join('config', 'iconfont-template.scss'))
                .pipe(consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: config.iconfont.fontName,
                    fontPath: config.iconfont.fontPath,
                    className: config.iconfont.prefix
                }))
                .pipe(rename(function(path) {
                    path.basename = 'iconfont';
                }))
                .pipe(gulp.dest(path.join(config.src, 'styles', 'common')))
        })
        .pipe(gulp.dest(path.join('config', 'fonts')))
});
