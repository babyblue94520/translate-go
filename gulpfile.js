const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('concat', function () {
  return gulp.src([
      './dist/*.js',
    ])
    .pipe(concat('translate-toolbar.js', {
      newLine: ';'
    }))
    .pipe(gulp.dest('./dist/lib/'));
});

gulp.task('css', function () {
  return gulp.src([
      './dist/styles.*.css',
    ])
    .pipe(concat('translate-toolbar.css', {
      newLine: ';'
    }))
    .pipe(gulp.dest('./dist/lib/'));
});

gulp.task('default',  gulp.series('concat','css'));
