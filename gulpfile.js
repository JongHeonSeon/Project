const gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('node-sass')),
    sourcemaps = require('gulp-sourcemaps'),
    gcmq = require('gulp-group-css-media-queries');

gulp.task('sass:compile', function () {
    return gulp
        .src(['./css/common/sass/common.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('common.css'))
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(gulp.dest('css/common'))
});

gulp.task('sass_project:compile', function () {
    return gulp
        .src(['./css/project/src/sass/common_project.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('common_project.css'))
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(gulp.dest('css/project/src/sass'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./css/common/sass/*.scss', gulp.series(['sass:compile']));
});

gulp.task('sass', gulp.series('sass:compile', 'sass:watch'));

gulp.task('project', () => {
    return (
        gulp
            .src(['css/project/font.css', 'css/project/src/sass/*.css', 'css/project/src/*.css'])
            .pipe(concat('project.css'))
            // .pipe(gcmq())
            .pipe(cleanCSS())
            .pipe(gulp.dest('css/project'))
    );
});

gulp.task('project:watch', function () {
    gulp.watch(['css/project/src/sass/*.css', 'css/project/src/*.css'], gulp.series(['project']));
});

gulp.task(
    'project',
    gulp.series('sass_project:compile', 'project')
);