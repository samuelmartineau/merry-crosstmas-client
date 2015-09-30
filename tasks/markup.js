var gulp = require('gulp');
var config = require('../config/config');
var riot = require('gulp-riot');
var path = require('path');
var jade = require('gulp-jade');

gulp.task('riot', function() {
	gulp.src(path.join(config.src, 'templates', 'tags', '*.tag'))
		.pipe(riot({
      compact: config.isProd,
      template: 'jade'
    }))
		.pipe(gulp.dest(path.join(config.dist, 'tags')));
});

gulp.task('template', function() {
  gulp.src(path.join(config.src, 'templates', '*.jade'))
    .pipe(jade({
      pretty: !config.isProd
    }))
    .pipe(gulp.dest(config.dist))
});
