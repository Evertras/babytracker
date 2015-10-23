var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bower = require('main-bower-files');

gulp.task('default', ['lint', 'html', 'sass', 'scripts', 'lib']);

gulp.task('watch', function() {
    gulp.watch('src/app/js/**/*.js', ['lint', 'scripts']);
    gulp.watch('src/app/sass/**/*.scss', ['sass']);
});

gulp.task('lint', function() {
    return gulp.src('src/app/js/**/*.js')
               .pipe(jshint())
               .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
    return gulp.src('src/app/sass/*.scss')
               .pipe(sass())
               .pipe(gulp.dest('src/build/css'))
               .pipe(concat('site.css'))
               .pipe(gulp.dest('wwwroot/css'));
});

gulp.task('scripts', function() {
    var srcFiles = [
                    'src/app/js/**/*.js',
                    '!src/app/js/**/*.tests.js'
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

gulp.task('html', function() {
    return gulp.src('src/app/html/**/*.html')
               .pipe(gulp.dest('wwwroot'));
});
