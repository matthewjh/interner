var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('transpile.es5', function() {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      module: 'amd',
      outDir: 'built',
    }));

  return tsResult.js.pipe(gulp.dest('built'));
});