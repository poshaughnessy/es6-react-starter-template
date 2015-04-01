/**
 * NB. The gulpfile isn't ES6 yet - looks like we need to wait for Gulp v0.4:
 * https://github.com/gulpjs/gulp/issues/830
 */

// Enable ES6 - this will make it automatically transpile required files
// See: http://babeljs.io/docs/usage/require/
require('babel/register');

// TEMP fix for this issue: https://github.com/babel/babel/issues/489
Object.getPrototypeOf.toString = function() {return Object.toString();};

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
 * Compile JS and SCSS
 */
gulp.task('compile', ['babelify', 'sass'], function() {
});


/**
 * Watch for changes and re-compile
 */
gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['babelify']);
    gulp.watch('./styles/*.scss', ['sass']);
});

/**
 * Compile, then start the server
 */
gulp.task('server', ['compile','watch'], function() {
    server.start();
});

/**
 * By default, runs the server task
 */
gulp.task('default', ['server'], function() {
});
