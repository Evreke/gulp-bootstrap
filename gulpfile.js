//Included plugins
var gulp = require('gulp');
var del = require('del');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemapse = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');


//Clear 'dev' directory with all children
gulp.task('clean:dev', function () {
    return del([
        './dev'
    ]);
});

//Handlebars
gulp.task('templates', function () {
    var options = {
        batch: ['./app/modules/']
    },
        templateData = {
            author: 'Alex Om',
            organisation: 'Systema Plexus',
            website: 'http://plexusit.ru'
        };

    gulp.src(['./app/modules/*.hbs', './app/modules/*.html'])
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dev/'));
});

//SASS task for development version
gulp.task('sass-dev', ['clean:dev'], function () {
    gulp.src('./app/modules/**/*.scss')
        .pipe(sourcemapse.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemapse.write('./'))
        .pipe(gulp.dest('./dev/assets/css'))
        .pipe(livereload());
});

//Watch tasks
gulp.task('watch:sass-dev', function () {
    gulp.watch('./app/modules/**/*.scss', ['sass-dev']);
});

gulp.task('dev', ['sass-dev', 'watch:sass-dev']);