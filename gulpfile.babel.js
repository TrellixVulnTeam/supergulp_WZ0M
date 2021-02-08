import gulp from "gulp";
import gpug from "gulp-pug"

const routes = {
    pug: {
        src: "src/**/*.pug",
        dest: "build"
        //
        //폴더 안쪽 파일까지 건드리고 싶다면 src/**/*.pug를 입력할것! //
    }
};
//pug는 src에 있고, 이 안의 .pug로 끝나는 모든 파일들을 컴파일하자! 


export const pug = () => 
    gulp
        .src(routes.pug.src)
        .pipe(gpug())
        .pipe(gulp.dest(routes.pug.dest));

export const dev = gulp.series([pug]);