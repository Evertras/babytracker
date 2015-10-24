var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bower = require('main-bower-files');
var del = require('del');
var flatten = require('gulp-flatten');

gulp.task('default', ['lint', 'html', 'sass', 'scripts', 'lib']);

gulp.task('clean', function() {
    // Sync = synchronous
    del.sync(['wwwroot/**', '!wwwroot']);
});

gulp.task('watch', function() {
    gulp.watch('src/app/**/*.js', ['lint', 'scripts']);
    gulp.watch('src/app/**/*.scss', ['sass']);
});

gulp.task('lint', function() {
    return gulp.src('src/app/**/*.js')
               .pipe(jshint())
               .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
    var srcFiles = [
                    'src/app/sass/**/*.scss',
                    'src/app/components/**/*.scss'
                   ];

    return gulp.src(srcFiles)
               .pipe(sass())
               .pipe(gulp.dest('src/build/css'))
               .pipe(concat('site.css'))
               .pipe(gulp.dest('wwwroot/css'));
});

gulp.task('scripts', function() {
    var srcFiles = [
                    'src/app/js/**/*.js',
                    'src/app/components/**/*.js',
                    '!src/app/**/*.tests.js'
                   ];

    return gulp.src(srcFiles)
               .pipe(concat('app.js'))
               .pipe(gulp.dest('wwwroot/js'))
               .pipe(rename('app.min.js'))
               .pipe(uglify())
               .pipe(gulp.dest('wwwroot/js'));
});

gulp.task('lib', function() {
    return gulp.src(bower(), { base: 'src/lib' })
               .pipe(gulp.dest('wwwroot/lib'));
});

gulp.task('html', ['html:templates'], function() {
    return gulp.src('src/app/html/**/*.html')
               .pipe(gulp.dest('wwwroot'));
});

gulp.task('html:templates', function() {
    return gulp.src('src/app/components/**/*.html')
               .pipe(flatten())
               .pipe(gulp.dest('wwwroot/template'));
});
