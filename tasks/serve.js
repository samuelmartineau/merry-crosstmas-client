var gulp = require('gulp');
var browserSync = require('browser-sync');
var path = require('path');
var config = require('../config/config');


gulp.task('template-watch', ['template'], browserSync.reload);
gulp.task('riot-watch', ['riot'], browserSync.reload);
gulp.task('style-watch', ['style-lint', 'styles'], browserSync.reload);
gulp.task('js-watch', ['lint', 'scripts'], browserSync.reload);

gulp.task('serve', function() {

		browserSync({
        server: {
            baseDir: config.dist
        }
    });

    gulp.watch(path.join(config.src, 'templates', 'tags', '*.jade'), ['riot-watch']);
    gulp.watch([path.join(config.src, 'templates', '*.jade'), path.join(config.src, 'templates', 'partials', '*.jade')], ['template-watch']);
    gulp.watch(path.join(config.src, 'styles', '**', '*.scss'), ['style-watch']);
    gulp.watch(path.join(config.src, 'scripts', '**', '*.js'), ['js-watch']);

});
