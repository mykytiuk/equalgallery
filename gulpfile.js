var gulp = require('gulp'),
    sass = require('gulp-sass'),
    mainBowerFiles = require('main-bower-files'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer');
 
gulp.task('default', function() {
    gulp.watch('scss/*.scss', ['styles', 'prefixer']);
});

gulp.task('styles', function() {
    gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css/'))
});

gulp.task('prefixer', function() {
    gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css/'))
});

gulp.task('copyjs', ['cleanjs'], function() {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(gulp.dest('libs'))
});

gulp.task('copycss', ['cleancss'], function() {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(gulp.dest('css'))
});

/*clean*/
gulp.task('cleanjs', function (path) {
    return gulp.src(['libs/*', '!libs/common.js'], {read: false})
        .pipe(clean());
});

gulp.task('cleancss', function (path) {
    return gulp.src(['css/*', '!css/style.css'], {read: false})
        .pipe(clean());
});