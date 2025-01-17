import gulp from "gulp";
import concat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";

gulp
  .src([
    "./src/css/main.css",
    "./src/css/header.css",
    "./src/css/description.css",
    "./src/css/detail.css",
    "./src/css/offline.css",
  ])
  .pipe(concat("index.css")) // samenvoegen bestanden en bestandsnaam opgeven
  .pipe(cleanCSS()) // minify de css
  .pipe(autoprefixer({ cascade: false })) // regelt webkit
  .pipe(gulp.dest("./public/css"));
