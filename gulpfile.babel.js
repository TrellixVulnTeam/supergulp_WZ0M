import gulp from "gulp";
import gpug from "gulp-pug"
import del from "del";
import ws from "gulp-webserver";

//만약 src를 변경했다고 해보자! 
//콘솔창에 yarn add del 을 사용하여 삭제! 

const routes = {
    pug: {
        watch: "src/**/*.pug", //wating--지켜볼 파일!의 소스를 적었다.
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

const clean = () => del(["build/"]);
//속성이 변할때를 대비해 먼저 초기화하고 build 폴더를 생성한다.
//export const clean = () => del("build")
//clean이라는 변수는 del"build"라는 것을 지운다.

const webserver = () =>
    gulp.src("build").pipe(ws({
        livereload: true,
        open: true
    }));
//livereload는 파일을 저장하면 자동으로 새로고침해준다.

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    //wating-- 누가 pug를 지켜볼 것인지 적는다. 
    //pug 변수를 지켜볼 것이다.
}


const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

const postDev = gulp.series([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);
//먼저 clean을 통해 build 폴더를 지우고 , pug를 적용!            
//만약 clean을 exprot 하지 않는다면, 콘솔이나 package.json에서 사용하지 못한다.