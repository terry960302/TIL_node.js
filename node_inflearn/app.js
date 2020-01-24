const express = require("express");
var app = express();
const bodyParser = require("body-parser");
const router = require("./router/index");

//미들웨어 세팅
app.use(express.static("public")); // 정적 파일 세팅(주소에 파일이름만 적어도 접근 가능)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //post데이터 화면에 띄우기 위한 body-parser
app.set("view engine", "ejs"); // 뷰 엔진(ejs나 pug 등등)

//서버 시작
app.listen(3000, () => {
  console.log("시작합니다. 3000");
});

//라우팅
app.use(router);
