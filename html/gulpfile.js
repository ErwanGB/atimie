// Requis
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = './src'; // dossier de travail
var prod = './prod'; // dossier à livrer

// Tâche "build" = Sass + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task('css', function () {
  return gulp.src(source + '/assets/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(prod + '/assets/css/'));
});

// Tâche html / Copie simple dans prod.
gulp.task('html',function(){
    return gulp.src(source + '/*.html')
    .pipe(gulp.dest(prod))    
});

// Tâche "js" = uglify + concat
gulp.task('js', function() {
  return gulp.src(source + '/assets/js/*.js')
    .pipe(uglify())
    .pipe(concat('global.min.js'))
    .pipe(gulp.dest(prod + '/assets/js/'));
});

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
  return gulp.src(prod + '/assets/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(prod + '/assets/css/'));
});

// Tâche "build"
gulp.task('build', ['css']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

// Tâche "watch" = je surveille *scss
gulp.task('watch', function () {
    browserSync.init({
        server: prod
    });
  gulp.watch(source + '/assets/css/*.scss', ['build']);
  gulp.watch(source + '/*.html',['html'] )
  gulp.watch(prod+"/*.html").on('change', browserSync.reload);
  gulp.watch(prod+"/*.css").on('change', browserSync.reload);
});

// Tâche par défaut
gulp.task('default', ['build','localserv']);