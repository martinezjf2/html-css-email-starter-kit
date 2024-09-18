var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var shell = require('gulp-shell')

function webpack() {
    return gulp.src('*.js', {read: false})
        .pipe(shell(['webpack']))
        .pipe(browserSync.stream());
}

function style() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS())  // Minify CSS
        .pipe(sourcemaps.write())  // Write sourcemaps
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
}

function browserSyncInit(done) {
    browserSync.init({
        server: {
            baseDir: './public',
            notify: false,
            open: false,
            injectChanges: false
        }
    });
    done();
}

function reload(done) {
    browserSync.reload();
    done();
}

gulp.task('sass', style);
gulp.task('webpack', webpack);

gulp.task('watch', gulp.series(browserSyncInit, function() {
    gulp.watch('./src/scss/**/*', gulp.series('sass'));
    gulp.watch('./src/js/**/*', gulp.series('webpack'));
    gulp.watch('./public/*.html', reload);
}));

gulp.task('default', gulp.series('sass', 'webpack', 'watch'));
