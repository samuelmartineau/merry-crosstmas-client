var gulp = require('gulp');
var browserSync = require('browser-sync');
var path = require('path');
var config = require('../config/config');
var reload = browserSync.reload;

gulp.task('serve', ['build'], function() {
	browserSync({
		server: {
			baseDir: config.dist
		}
	});

  	gulp.watch(path.join(config.src, 'templates', 'tags', '*.tag'), ['riot']);
  	gulp.watch(path.join(config.src, 'templates', '**', '*.jade'), ['template']);
		gulp.watch(path.join(config.src, 'styles', '**', '*.scss'), ['style-lint', 'styles']);
		gulp.watch(path.join(config.src, 'scripts', '**', '*.js'), ['lint', 'scripts']);
    gulp.watch(path.join(config.dist, '**', '*'), reload);
});
