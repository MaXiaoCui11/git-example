var gulp = require('gulp');
var uglify = require('gulp-uglify');//压缩js文件
var minifycss = require('gulp-clean-css');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
/*
gulp.src([fliename])处理匹配的文件
gulp.dest('path');路径
gulp.task(name,[deps],function(){
    
});
gulp.watch('fliename',[任务列表]);
connect刷新
 */


//定义编译sass源文件的任务
gulp.task('comilesass',function(){
    return sass('./sass/*.scss',{
        style: 'compressed'})
    .pipe(gulp.dest('./stylesheets/'))
});

//定义压缩js文件的任务
gulp.task('compressedJs',function(){
  return  gulp.src('./js/*.js')
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dest/'))
}) ;

gulp.task('reload',['comilesass','compressedJs'],function() {
    return gulp.src('./index.html').pipe(connect.reload())
});

gulp.task('default',  ['comilesass','compressedJs'],function() {

        //开启服务器
        connect.server({
            livereload: true,
        });

        gulp.watch('./index.html/',['./sass/*.scss' , './js/*.js'], ['reload'])
});