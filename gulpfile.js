const { watch } = require('browser-sync');
const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      pug = require('gulp-pug'),
      sass = require('gulp-sass')(require("sass"));

const app ="app/",
      dist = "dist";

const config = {
    app : {
        html : app + "pug/index.pug",
        style : app + "scss/**/*.*",
        js : app + "js/**/*.*",
        fonts : app + "fonts/**/*.*",
        img : app + "img/**/*.*"
    },
    dist : {
        html : dist,
        style : dist + "scss/",
        js : dist + "js/",
        fonts : dist + "fonts/",
        img : dist + "img/"
    },
    watch : {
        html : app + "pug/index.pug",
        style : app + "scss/**/*.*",
        js : app + "js/**/*.*",
        fonts : app + "fonts/**/*.*",
        img : app + "img/**/*.*"
    }
}

const webServer = () => {
    browserSync.init({
        server: {
            baseDir: dist
        },
        port: 9000,
        host: "localhost",
        notify: false
    })
}

const pugTask = () => {
    return gulp.src(config.app.html)
    // .pipe(pug())
    .pipe(pug({
        pretty:false
    }))
    .pipe(gulp.dest(config.dist.html))
    .pipe(browserSync.reload({stream: true}))
}

const scssTask = () => {
    return gulp.src(config.app.style)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(config.dist.style))
    .pipe(browserSync.reload({stream: true}))
}

const watchFiles = () => {
    gulp.watch([config.watch.html], gulp.series(pugTask));
    gulp.watch([config.watch.style], gulp.series(scssTask));
}

const start = gulp.series(pugTask, scssTask);

exports.default = gulp.parallel(start, watchFiles, webServer);











