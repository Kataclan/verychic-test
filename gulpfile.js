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
        debug: "dist/debug/",
        release: "dist/release/",
        jsFileName: "app.js",
        cssFileName: "style.css",
    }
};
//#region [ www ]
gulp.task("www-debug", function () {
    return gulp.src(paths.in.wwwFiles, { base: paths.in.wwwFolder })
        .pipe(gulp.dest(paths.out.debug));
});
gulp.task("www-release", function () {
    return gulp.src(paths.in.wwwFiles, { base: paths.in.wwwFolder })
        .pipe(gulp.dest(paths.out.release));
});
//#endregion

//#region [ app ]
gulp.task("clean", function () {
    return gulp.src(paths.out.folder)
        .pipe(clean());
});
gulp.task("debug", ["www-debug", "css-debug"], function () {
    return browserify({
        debug: true,
        entries: paths.in.code
    })
        .plugin(tsify)
        .bundle()
        .pipe(mold.transformSourcesRelativeTo(paths.out.debug))
        .pipe(source(paths.out.jsFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.out.debug))
        .pipe(size({ title: paths.out.debug + paths.out.jsFileName }));
});
gulp.task("release", ["www-release", "css-release"], function () {
    return browserify({
        entries: paths.in.code,
    })
        .plugin(tsify)
        .bundle()
        .pipe(source(paths.out.jsFileName))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.out.release))
        .pipe(size({ title: paths.out.release + paths.out.jsFileName }));
});
//#endregion

//#region [ style ]
gulp.task("css-debug", function () {
    return gulp
        .src(paths.in.style)
        .pipe(concat(paths.out.cssFileName))
        .pipe(gulp.dest(paths.out.debug))
        .pipe(size({ title: paths.out.debug + paths.out.cssFileName }));
});
gulp.task("css-release", function () {
    return gulp
        .src(paths.in.style)
        .pipe(cleanCSS())
        .pipe(concat(paths.out.cssFileName))
        .pipe(gulp.dest(paths.out.release))
        .pipe(size({ title: paths.out.release + paths.out.cssFileName }))
});
//#endregion