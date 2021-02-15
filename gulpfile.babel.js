import gulp from "gulp";
import gpug from "gulp-pug"
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";

//만약 src를 변경했다고 해보자! 
//콘솔창에 yarn add del 을 사용하여 삭제! 

const routes = {
    pug: {
        watch: "src/**/*.pug",
        //src는 index.pug가 되기 위해 src/*.pug라고 지정하였지만,
        //partials 폴더 안의 footer, header.pug가 변화되는 것도 지켜봐야하므로,
        //watch에는 src/**/*/.pug로 지정하였다.
        src: "src/*.pug",
        //폴더의 안쪽폴더 파일까지 건드리고 싶다면 src/**/*.pug를 입력할것! //
        dest: "build"
        //dest(destination)은 "build"다! 
    },
    img: {
        src: "src/img/*",
        //img 파일에 있는 모든 파일들!
        dest: "build/img"

    }
};
//pug는 src에 있고, 이 안의 .pug로 끝나는 모든 파일들을 컴파일하자! 


const pug = () =>
    gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));
//gulp의 dest(destination)! 종착점이 dest인 "build"인거야! 

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
    //변수routes안에 pug의 watch가 변수pug를 지켜본다.
    gulp.watch(routes.img.src, img);
}

const img = () =>
    gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug]);

const postDev = gulp.parallel([webserver, watch]);
//postDev는 웹서버를 실행하고, 파일의 변동사항을 지켜보는 역할을 한다.
//parallel은 두가지를 병행하여 실행하게끔 한다.

export const dev = gulp.series([prepare, assets, postDev]);
//먼저 clean을 통해 build 폴더를 지우고 , pug를 적용!            
//만약 clean을 exprot 하지 않는다면, 콘솔이나 package.json에서 사용하지 못한다.