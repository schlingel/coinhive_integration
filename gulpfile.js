const gulp = require('gulp');
const clean = require('gulp-clean');
const declare = require('gulp-declare');
const concat = require('gulp-concat');
const hbsAll = require('gulp-handlebars-all');
const merge = require('merge-stream');
const uglify = require('gulp-uglify');


gulp.task('default', ['clean', 'compileTemplates', 'minify']);
gulp.task('clean', [], cleanProject);
gulp.task('compileTemplates', [], compileTemplates);
gulp.task('minify', ['compileTemplates'], minify)

function minify() {
  return gulp.src('dist/coinhive.integration.js')
    .pipe(uglify())
    .pipe(concat('coinhive.integration.min.js'))
    .pipe(gulp.dest('dist/'));
}

function cleanProject() {
  return gulp.src('dist/')
    .pipe(clean());
}

function compileTemplates() {
  let runTimeStream = gulp.src([
    'src/js/handlebars.runtime-v4.0.10.js',
    'src/js/jquery-3.2.1.min.js',
    'src/js/coinhive-integration.js'
  ]);
  let templatesStream = gulp.src('src/hbs/*.hbs')
    .pipe(hbsAll('js'))
    .pipe(declare({
      namespace: 'BI.templates',
      noRedeclare: true
    }));

  return merge(runTimeStream, templatesStream)
    .pipe(concat('coinhive.integration.js'))
    .pipe(gulp.dest('dist/'));
}
