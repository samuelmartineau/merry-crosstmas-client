var gulp = require('gulp');
var gIf = require('gulp-if');
var config = require('../config/config');
var riot = require('gulp-riot');
var path = require('path');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');

gulp.task('riot', function() {
	gulp.src(path.join(config.src, 'templates', 'tags', '*.jade'))
		.pipe(riot({
      compact: config.isProd,
      template: 'jade'
    }))
		.pipe(gIf(config.isProd, uglify()))
		.pipe(gulp.dest(path.join(config.dist, 'tags')));
});

gulp.task('template', function() {
  gulp.src(path.join(config.src, 'templates', '*.jade'))
    .pipe(jade({
      pretty: !config.isProd
    }))
    .pipe(gulp.dest(config.dist))
});
