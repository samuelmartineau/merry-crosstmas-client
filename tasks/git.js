var gulp = require('gulp');
var git = require('gulp-git');
var path = require('path');
var config = require('../config/config');

gulp.task('git', function(){
  gulp.src(path.join(config.dist))
    .pipe(git.init(function (err) {
      if (err) throw err;
    }))
    .pipe(git.addRemote('origin', 'https://github.com/samuelmartineau/merry-crosstmas.git', function (err) {
      if (err) throw err;
    }))
    .pipe(git.add({args: '-A -v'}))
    .pipe(git.commit(undefined, {
      args: '-m "release"',
      disableMessageRequirement: true
    }))
    .pipe(git.push('origin', 'master', {args: " -f"}, function (err) {
      if (err) throw err;
    }));
});
