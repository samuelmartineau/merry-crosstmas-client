var gulp = require('gulp');

require('require-dir')('./tasks');

gulp.task('dev', ['serve'], function() {

});

gulp.task('build', ['assets', 'riot', 'template'], function() {

});
