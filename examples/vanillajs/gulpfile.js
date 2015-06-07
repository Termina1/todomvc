var gulp = require('gulp');
var webpack = require('webpack');
var gwebpack = require('gulp-webpack');
var wconfig = require('./webpack.config');
var named = require('vinyl-named');

gulp.task('js', function() {
  return gulp.src(['./js/app.js', './js/serviceworker.js'])
    .pipe(named())
    .pipe(gwebpack(wconfig, webpack))
    .pipe(gulp.dest('./build/'));
});


gulp.task('index', function() {
  return gulp.src(['index.html', 'manifest.json'])
    .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['index', 'js']);
