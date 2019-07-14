//Подключаем галп
const gulp = require('gulp');
//Объединение файлов
const concat = require('gulp-concat');
//Добапвление префиксов
const autoprefixer = require('gulp-autoprefixer');
//Оптимизация стилей
const cleanCSS = require('gulp-clean-css');
//Оптимизация скриптов
const uglify = require('gulp-uglify');
//Удаление файлов
const del = require('del');
//Синхронизация с браузером
const browserSync = require('browser-sync').create();
//Для препроцессоров стилей
const sourcemaps = require('gulp-sourcemaps');
//Sass препроцессор
const sass = require('gulp-sass');
//Less препроцессор
const less = require('gulp-less');
//Stylus препроцессор
const stylus = require('gulp-stylus');
//Модуль для сжатия изображений
const imagemin = require('gulp-imagemin');
//Модуль переименовывания файлов
const rename = require('gulp-rename');

const sassFiles    = [
   './src/sass/main.sass'

]
const cssFiles = [
   './build/css/main.css'

]
const jsFiles    = [
   './src/js/lib.js',
   './src/js/main.js'
]

//Таск для обработки стилей
gulp.task('styles', () => {
   //Шаблон для поиска файлов CSS
   //Всей файлы по шаблону './src/css/**/*.css'
   return gulp.src(sassFiles)
      .pipe(sourcemaps.init())
      //Указать stylus() , sass() или less()
      .pipe(sass())
      //Объединение файлов в один
      .pipe(concat('main.css'))
      //Добавить префиксы
      .pipe(autoprefixer({
         overrideBrowserslist: ['last 2 versions'],
         cascade: false
      }))
      // //Минификация CSS
      // .pipe(cleanCSS({
      //    level: 2
      // }))
      .pipe(sourcemaps.write('./'))
      //Выходная папка для стилей
      .pipe(gulp.dest('./src/css'))
      .pipe(gulp.dest('./build/css'))
});

//Таск для обработки скриптов
gulp.task('scripts', () => {
   //Шаблон для поиска файлов JS
   //Всей файлы по шаблону './src/js/**/*.js'
   return gulp.src(jsFiles)
      //Объединение файлов в один
      .pipe(concat('script.js'))
      //Минификация JS
      .pipe(uglify({
         toplevel: true
      }))
      //Выходная папка для скриптов
      .pipe(gulp.dest('./build/js'))
      // .pipe(browserSync.stream());
});

//Таск для очистки папки build
gulp.task('del', () => {
   return del(['build/*'])
});

//Таск для сжатия изображений
gulp.task('img-compress', ()=> {
   return gulp.src('./src/img/**')
   .pipe(imagemin({
      progressive: true
   }))
   .pipe(gulp.dest('./build/img/'))
});

//Таск для отслеживания изменений в файлах
gulp.task('watch', () => {
   // browserSync.init({
   //    server: {
   //       baseDir: "./"
   //    }
   // });
   //Следить за добавлением новых изображений
   gulp.watch('./src/img/**', gulp.series('img-compress'))
   //Следить за файлами со стилями с нужным расширением
   gulp.watch('./src/sass/**/*.sass', gulp.series('styles'))
   //Следить за JS файлами
   gulp.watch('./src/js/**/*.js', gulp.series('scripts'))
   //При изменении HTML запустить синхронизацию
   // gulp.watch("./*.html").on('change', browserSync.reload);
});

function CSSclean() {
   return gulp.src(cssFiles)
.pipe(cleanCSS({
   level: 2
}))
.pipe(sourcemaps.write('./'))
.pipe(gulp.dest('./build/css'))
}
gulp.task('CSSclean', CSSclean)

//Таск по умолчанию, Запускает del, styles, scripts, img-compress и watch
gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts', 'img-compress'), 'watch'));
