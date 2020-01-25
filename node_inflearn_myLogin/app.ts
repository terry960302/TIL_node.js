import express from "express";
const app = express();
import * as bodyParser from "body-parser";
import passport from "passport";
import * as LocalStrategy from "passport-local";
import session from "express-session";
import flash from "connect-flash";
import router from "./router/index";

//미들웨어 세팅
app.use(express.static("public")); //정적파일을 바로 가져다 사용할 수 있게 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); //뷰 탬플릿 엔진으로 ejs 사용
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//루트 라우팅
app.use(router);

//서버
app.listen(3000, function() {
  console.log("3000포트에서 서버를 정상적으로 실행하고 있습니다.");
});
