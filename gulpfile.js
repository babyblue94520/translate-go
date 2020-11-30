const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const replace = require('gulp-string-replace');
const del = require('del');

gulp.task('clean', function () {
  return del('dist/**', {
    force: true
  });
});

gulp.task('copyAssets', function () {
  return gulp.src('./src/assets/**/*', {
    base: './src'
  })
    .pipe(gulp.dest('./dist'));
});

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
