import gulp from "gulp";
import gpug from "gulp-pug"
import del from "del";

//만약 src를 변경했다고 해보자! 
//콘솔창에 yarn add del 을 사용하여 삭제! 

const routes = {
    pug: {
        src: "src/*.pug",
        dest: "build"
        //
        //폴더의 안쪽폴더 파일까지 건드리고 싶다면 src/**/*.pug를 입력할것! //
    }
};
//pug는 src에 있고, 이 안의 .pug로 끝나는 모든 파일들을 컴파일하자! 


const pug = () => 
    gulp
        .src(routes.pug.src)
        .pipe(gpug())
        .pipe(gulp.dest(routes.pug.dest));

const clean = () => del("build")
//export const clean = () => del("build")
//clean이라는 변수는 del"build"라는 것을 지운다.

const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

export const dev = gulp.series([prepare, assets]);
//clean을 하고, pug를 적용!            
//만약 clean을 exprot 하지 않는다면, 콘솔이나 package.json에서 사용하지 못한다.