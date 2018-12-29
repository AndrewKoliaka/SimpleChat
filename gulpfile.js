const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const htmlMin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const del = require('del');

const pathTo = {
    bin: {
        folder: 'bin',
        views: 'bin/views',
        js: 'bin/js',
        css: 'bin/css'
    },
    src: {
        public: {
            views: 'public/src/views/*.html',
            js: 'public/src/**/*.js',
            css: 'public/styles.css',
            index: 'public/index.html'
        },
        backend: {
            js: 'backend/**/*.js',
            server: './server.js'
        }
    },
    libs: {
        css: [
            'node_modules/spectre.css/dist/spectre.min.css',
            'node_modules/spectre.css/dist/spectre-exp.min.css',
            'node_modules/spectre.css/dist/spectre-icons.min.css'
        ],
        js: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-resource/angular-resource.min.js',
            'node_modules/angular-cookies/angular-cookies.min.js'
        ]
    }
};

gulp.task('libs', () => {
    const jsLibs = gulp.src(pathTo.libs.js)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(pathTo.bin.js));

    const cssLibs = gulp.src(pathTo.libs.css)
        .pipe(concat('libs.css'))
        .pipe(gulp.dest(pathTo.bin.css));

    return merge(jsLibs, cssLibs);
});

gulp.task('css', () => gulp.src(pathTo.src.public.css)
    .pipe(cleanCSS({
        compatibility: 'ie8'
    }))
    .pipe(gulp.dest(pathTo.bin.css)));

gulp.task('js', () => gulp.src(pathTo.src.public.js)
    .pipe(concat('app.js'))

    // .pipe(babel())
    // .pipe(uglify({
    //     mangle: false
    // }))
    .pipe(gulp.dest(pathTo.bin.js)));

gulp.task('views', () => {
    const subViews = gulp.src(pathTo.src.public.views)
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest(pathTo.bin.views));

    const index = gulp.src(pathTo.src.public.index)
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest(pathTo.bin.folder));

    return merge(subViews, index);
});

gulp.task('eslint', () => gulp.src([pathTo.src.public.js, pathTo.src.backend.js])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

gulp.task('del', () => del([pathTo.bin.folder]));

gulp.task('watch', () => {
    gulp.watch(pathTo.src.public.css, ['css']);
    gulp.watch(pathTo.src.public.js, ['js']);
    gulp.watch([pathTo.src.public.views, pathTo.src.public.index], ['views']);
});

gulp.task('build', ['libs', 'js', 'css', 'views']);

gulp.task('default', ['build', 'watch']);
