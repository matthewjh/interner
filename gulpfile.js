var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('compile', function() {
  var tsResult = gulp.src([
      'src/**/*.ts',
      'typings/**/*.d.ts'
    ])
    .pipe(ts({
      noImplicitAny: true,
      noExternalResolve: true,
      module: 'amd',
      outDir: 'built',
      typescript: require('typescript')
    }));

  return tsResult.js.pipe(gulp.dest('built'));
});