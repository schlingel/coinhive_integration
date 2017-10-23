const gulp = require('gulp');
const clean = require('gulp-clean');
const declare = require('gulp-declare');
const concat = require('gulp-concat');
const hbsAll = require('gulp-handlebars-all');
const debug = require('gulp-debug');
const merge = require('merge-stream');


gulp.task('default', ['clean', 'compileTemplates']);
gulp.task('clean', [], cleanProject);
gulp.task('compileTemplates', [], compileTemplates);

function cleanProject() {
  return gulp.src('assets/templates/*.js')
    .pipe(clean());
}

function compileTemplates() {
  let runTimeStream = gulp.src('src/js/handlebars.runtime-v4.0.10.js');
  let templatesStream = gulp.src('src/templates/*.hbs')
    .pipe(hbsAll('js'))
    .pipe(declare({
      namespace: 'Radl.templates',
      noRedeclare: true
    }));

  return merge(runTimeStream, templatesStream)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('assets/js/templates/'));
}
