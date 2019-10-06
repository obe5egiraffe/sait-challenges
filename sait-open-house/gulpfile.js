const gulp = require('gulp')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify-es').default
const autoprefixer = require('gulp-autoprefixer')
const cache = require('gulp-cached')
const rename = require('gulp-rename')

const paths = {
    styles: {
        src: 'src/sass/**/*.scss',
        dest: 'css/'
    }, 
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'js'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'img'
    }
}

function styles () {
    return gulp.src(paths.styles.src)
        .pipe(sass({ outputStyle : 'compressed' }))
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(cache('styles'))
        .pipe(gulp.dest(paths.styles.dest));
}

function scripts () {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cache('scripts'))
        .pipe(gulp.dest(paths.scripts.dest));
}

function images () {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(cache('images'))
        .pipe(gulp.dest(paths.images.dest))
}

function watch () {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.images.src, images)
}

exports.styles = styles
exports.scripts= scripts
exports.images = images
exports.watch = watch