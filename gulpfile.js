var gulp = require('gulp');
var cheerio = require('gulp-cheerio');

var map = ['about', 'gridacord', 'purge', 'fit-text-to-screen', 'hellochristinekim', 'sshish', 'seeing-eye-pi'];

gulp.task('expand',function(){
  
  map.forEach(function(item){
    gulp.src(['index.html'])
      .pipe(cheerio(function($, file){

        $('#' + item + '-detail').addClass('active');

      }))
      .pipe(gulp.dest('./' + item + '/'));
  });
});