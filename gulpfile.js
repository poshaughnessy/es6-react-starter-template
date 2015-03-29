/**
 * NB. This isn't ES6 yet! That's because I'm waiting for Gulp v0.4:
 * https://github.com/gulpjs/gulp/issues/830
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    fs = require('fs'),
    server = require('./server');

/**
 *  Transpile and concatenate the JavaScripts into dist/bundle.js
 */
gulp.task('babelify', function() {

    browserify({ debug: true })
        .transform(babelify)
        .require("./src/main.js", { entry: true })
        .bundle()
        .on("error", function (err) { console.log("Babelify error : " + err.message); })
        .pipe(fs.createWriteStream("./dist/bundle.js"));

});

/**
 *  Compile and concatenate the SCSS files into dist/styles.css
 */
gulp.task('sass', function() {

    return gulp.src('./styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./dist'));

});

/**
 * Watch for changes and re-compile
 */
gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['babelify']);
    gulp.watch('./styles/*.scss', ['sass']);
});

/**
 * Compile, then start the Express server
 */
gulp.task('server', ['babelify','sass','watch'], function() {
    server.startExpress();
});

/**
 * By default, runs the server task
 */
gulp.task('default', ['server'], function() {
});
