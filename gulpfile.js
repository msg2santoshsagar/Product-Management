
var gulp = require('gulp');
var inject = require('gulp-inject');
var naturalSort = require('gulp-natural-sort');
var angularFileSort = require('gulp-angular-filesort');


gulp.task('build',function(){
	gulp.src('public/index.html').
	pipe(inject(gulp.src('public/app/**/*.js')
	.pipe(naturalSort())
	.pipe(angularFileSort()),{relative:true}))
	.pipe(gulp.dest('public/'));
});