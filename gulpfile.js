const gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('node-sass')),
    sourcemaps = require('gulp-sourcemaps'),
    gcmq = require('gulp-group-css-media-queries');

gulp.task('sass_project:compile', function () {
    return gulp
        .src(['./css/src/sass/common.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('common.css'))
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(gulp.dest('css/src/sass'));
});

gulp.task('project', () => {
    return (
        gulp
            .src(['css/font.css', 'css/src/sass/*.css', 'css/src/*.css'])
            .pipe(concat('project.css'))
            // .pipe(gcmq())
            .pipe(cleanCSS())
            .pipe(gulp.dest('css'))
    );
});

gulp.task('project:watch', function () {
    gulp.watch(['css/src/sass/*.css', 'css/src/*.css'], gulp.series(['project']));
});

gulp.task(
    'project',
    gulp.series('sass_project:compile', 'project')
);