import gulp from "gulp";
import concat from "gulp-concat";
import uglify from "gulp-uglify";

gulp
  .src("./src/js/index.js")
  .pipe(concat("index.js")) // samenvoegen bestanden en bestandsnaam opgeven
  .pipe(uglify()) // minify de css
  .pipe(gulp.dest("./public/js"));

gulp
  .src("./src/js/history.js")
  .pipe(uglify()) // minify de css
  .pipe(gulp.dest("./public/js"));
