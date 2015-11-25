# gulp-bootstrap
Набор тасков для автоматизации задач в [gulp.js](http://gulpjs.com/).

## Архитекрута
<pre>
YourProjectName
              └─app         
                  └───modules 
                            ├───block
                            └───head
</pre>
<br>
<b>app</b> - Корневая папка проекта, вся работа проводится в ней <br>
<b>modules</b> - В папке содержатся файлы стилей (scss) и шаблона (handlebars). Компилятор затрагивает эти файлы. Служит хранилищем для модулей. <br>
<b>block</b> - Папка содержащая файлы стилей, шаблонов или разметки для конкретного блока. Я использовал идеологию БЭМ, но в удобной для меня манере. <br>
<b>head</b> - Папка содержащая контент для тега <head> <br>

## Какие задачи решает?
 
[gulp-sass](https://www.npmjs.com/package/gulp-sass) - компиляция SASS
<br>
[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - sass sourcemaps
<br>
[gulp-compile-handlebars](https://www.npmjs.com/package/gulp-compile-handlebars) - Компиляция файлов шаблонизатора handlebars
<br>
task dev создает в директории "YourProjectName" development версию проекта и запускает слежение за файлами SASS.



