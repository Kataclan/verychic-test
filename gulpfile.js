var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var tsify = require("tsify");
var gutil = require("gulp-util");
var watchify = require("watchify");
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var mold = require('mold-source-map');
var fs = require('fs');
const path = require('path');

var paths = {
    in: {
        code: ['src/app/index.tsx'],
        style: [
            "src/style/**/*.*",
            "src/app/components/*.css"
        ],
        wwwFiles: ['src/www/**/**/*.*'],
        wwwFolder: "src/www/",
    },
    out: {
        folder: "dist/",
        dev: "dist/dev/",
        prod: "dist/prod/",
        jsFileName: "app.js",
        cssFileName: "style.css",
    }
};
//#region [ www ]
gulp.task("www-dev", function () {
    return gulp.src(paths.in.wwwFiles, { base: paths.in.wwwFolder })
        .pipe(gulp.dest(paths.out.dev));
});
gulp.task("www-prod", function () {
    return gulp.src(paths.in.wwwFiles, { base: paths.in.wwwFolder })
        .pipe(gulp.dest(paths.out.prod));
});
//#endregion

//#region [ app ]
gulp.task("clean", function () {
    return gulp.src(paths.out.folder)
        .pipe(clean());
});
gulp.task("build-dev", ["www-dev", "css-dev"], function () {
    return browserify({
        debug: true,
        entries: paths.in.code
    })
        .plugin(tsify)
        .bundle()
        .pipe(mold.transformSourcesRelativeTo(paths.out.dev))
        .pipe(source(paths.out.jsFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.out.dev))
        .pipe(size({ title: paths.out.dev + paths.out.jsFileName }));
});
gulp.task("build-prod", ["www-prod", "css-prod"], function () {
    return browserify({
        entries: paths.in.code,
    })
        .plugin(tsify)
        .bundle()
        .pipe(source(paths.out.jsFileName))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.out.prod))
        .pipe(size({ title: paths.out.prod + paths.out.jsFileName }));
});
//#endregion

//#region [ style ]
gulp.task("css-dev", function () {
    return gulp
        .src(paths.in.style)
        .pipe(concat(paths.out.cssFileName))
        .pipe(gulp.dest(paths.out.dev))
        .pipe(size({ title: paths.out.dev + paths.out.cssFileName }));
});
gulp.task("css-prod", function () {
    return gulp
        .src(paths.in.style)
        .pipe(cleanCSS())
        .pipe(concat(paths.out.cssFileName))
        .pipe(gulp.dest(paths.out.prod))
        .pipe(size({ title: paths.out.prod + paths.out.cssFileName }))
});
//#endregion