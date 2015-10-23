var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', ['lint', 'sass', 'scripts']);

gulp.task('lint', function() {
    return gulp.src('src/js/**/*.js')
               .pipe(jshint())
               .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
               .pipe(sass())
               .pipe(gulp.dest('src/build/css'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
               .pipe(concat('app.js'))
               .pipe(gulp.dest('wwwroot/js'))
               .pipe(rename('app.min.js'))
               .pipe(uglify())
               .pipe(gulp.dest('wwwroot/js'));
});
