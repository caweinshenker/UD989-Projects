var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');


gulp.task('default', ['styles'], function(){
    gulp.watch('index.html').on('change', browserSync.reload);
    gulp.watch('css/**/*.css').on('change', browserSync.reload);
    browserSync.init({
        server: './'
    });

});


gulp.task('styles', function(){
    

});
