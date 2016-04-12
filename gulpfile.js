var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify"); // Reactify converts jsx to js
var source = require("vinyl-source-stream"); // This converts a string to a stream
var browserSync = require('browser-sync');

gulp.task('browserify', function(){
    browserify('./src/js/main.js')
        .transform('reactify')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));
	gulp.src('src/css/*.*')
		.pipe(gulp.dest('dist/css'));
	gulp.src('src/js/vendors/*.*')
		.pipe(gulp.dest('dist/js'));
});

gulp.task('server', function() {
    browserSync({
    server: {
        baseDir: './'
    },
    port: process.env.PORT,
    host: process.env.IP
    });
});

gulp.task('default', ['browserify', 'copy'], function(){
   return gulp.watch('src/**/*.*', ['browserify', 'copy']); 
});