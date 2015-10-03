var gulp = require('gulp');
var git = require('gulp-git');
var path = require('path');

gulp.task('git', ['init', 'add', 'commit', 'push']);

// Run git init
// src is the root folder for git to initialize
gulp.task('init', function(){
  return gulp.src(path.join(config.dist, '**', '*'))
    .pipe(git.init(function (err) {
      if (err) throw err;
    }));
});

// Run git add
// src is the file(s) to add (or ./*)
gulp.task('add', function(){
  return gulp.src(path.join(config.dist, '**', '*'))
    .pipe(git.add());
});

// Run git commit without checking for a message using raw arguments
gulp.task('commit', function(){
  return gulp.src(path.join(config.dist, '**', '*'))
    .pipe(git.commit(undefined, {
      args: '-m "release"',
      disableMessageRequirement: true
    }));
});

// Run git push with options
// branch is the remote branch to push to
gulp.task('push', function(){
  git.push('origin', 'master', {args: " -f"}, function (err) {
    if (err) throw err;
  });
});
