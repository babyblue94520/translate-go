const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const replace = require('gulp-string-replace');

gulp.task('concat', function () {
  return gulp.src([
      './dist/runtime.*.js',
      './dist/polyfills.*.js',
      './dist/scripts.*.js',
      './dist/styles.*.js',
      './dist/main.*.js',
    ])
    .pipe(concat('translate-toolbar.js', {
      newLine: ';'
    }))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('default', ['concat']);
