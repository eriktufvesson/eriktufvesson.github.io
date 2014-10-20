var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

gulp.task('webserver', function() {
    connect.server({
            root: '',
            livereload: true
        });
    //livereload();
});

gulp.task('html', function () {
    gulp.src('./**/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./**/*.html'], ['html']);
});

gulp.task('default', ['webserver', 'watch']);