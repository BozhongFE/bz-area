const gulp = require('gulp');
const connect = require('gulp-connect');
const builds = require('./build/config').getAllBuilds();
const handle= require('./build/build');

const devBuilds = builds.filter((item) => {
  if (item.temp && item.temp.match(/dev/)) {
    delete item.temp;
    return item;
  }
});

gulp.task('dev-build', function () {
  handle(devBuilds);
});

gulp.task('dev', function () {
  connect.server({
    livereload: true,
    port: 2333,
    host: '0.0.0.0',
  });
  gulp.watch('./src/**', ['dev-build']);
});