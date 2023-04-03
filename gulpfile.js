const options = {
  // See https://github.com/sass/node-sass#options
  sass: {
    outputStyle: 'expanded',
    errLogToConsole: true,
  },

  paths: {
    output: './dest',
    copy: './copy'
  },

  globs: {
    input: ['scss/**/*.scss'],
    copy: ['js/**']
  },

  // See https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
  cleanup: {
    advanced: true,
    inline: ['none'],
    processImport: false
  },

  // See https://github.com/ai/browserslist#queries
  autoprefixer: {
    grid: false,
    remove: false
  }
};

let del;
async function startup() {
  del = (await import('del')).deleteAsync;
}

const gulp = require('gulp');
const util = require('gulp-util');
const scss = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

gulp.task('startup', async () => {
  await startup();
});

gulp.task('clean', gulp.series('startup', async () => del([`${options.paths.output}/?**`])));

gulp.task('build', () => gulp
  .src(options.globs.input, { base: 'scss' })
  .pipe(sourcemaps.init())
  .pipe(scss())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(`${options.paths.output}/css`)));

gulp.task('copy', () => gulp
.src('js/**/*.js')
.pipe(gulp.dest(`${options.paths.output}/js`)));

gulp.task('watch', gulp.series('clean', 'build', 'copy', () => {
  browserSync.init({
    server: './'
  });
  gulp.watch('scss/**', gulp.series('sass'));
  gulp.watch(['./index.*']).on('change', browserSync.reload);
}));

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => gulp
  .src('scss/**/*.scss')
  .pipe(scss(options.sass))
  .pipe(gulp.dest(`${options.paths.output}/css`))
  .pipe(browserSync.stream()));

gulp.task('default', gulp.series('startup', 'clean', 'build'));
