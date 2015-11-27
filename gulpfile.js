//Included plugins
var gulp = require('gulp');
var del = require('del');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var globing = require('gulp-sass-glob');
var spritesmith = require('gulp.spritesmith');


//Clear 'dev' directory with all children
gulp.task('clean:dev', function () {
    return del([
        './dev'
    ]);
});

if(gulp.task.name == 'dev') {
    var test;
    test = "ok";
}

//Sprites
gulp.task('sprites-dev', function () {
    var spriteData =
        gulp.src('./app/images/sprite/*.*')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                //cssTemplate: 'sass.template.mustache',
                cssVarMap: function (sprite) {
                    sprite.name = 's-' + sprite.name;
                }
            }));
    spriteData.img.pipe(gulp.dest('./dev/assets/images/'));
    spriteData.css.pipe(gulp.dest('./dev/assets/css/'));
});

//Handlebars
gulp.task('templates', function () {
    var options = {
            batch: ['./app/modules/']
        },
        templateData = {
            author: 'Alex Om', //Use your name
            organisation: 'Systema Plexus', //Use your organisation name
            website: 'http://plexusit.ru'   //Use your website address
        };

    gulp.src(['./app/modules/*.hbs', './app/modules/*.html'])
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dev/'))
        .pipe(livereload())
});

//SASS task for development version
//plugins used:
//sourcemaps
//globing
//livereload
gulp.task('sass-dev', function () {
    gulp.src('./app/modules/*.scss')
        .pipe(sourcemaps.init())
        .pipe(globing())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.', {}))
        .pipe(gulp.dest('./dev/assets/css'))
        .pipe(livereload())
});

//Watch tasks
gulp.task('watch:sass-dev', function () {
    livereload.listen();
    gulp.watch('./app/modules/**/*.scss', ['sass-dev']);
    gulp.watch(['./app/modules/**/*.hbs', './app/modules/**/*.html'], ['templates']);
});

gulp.task('dev', ['templates', 'sprites-dev', 'sass-dev', 'watch:sass-dev']);