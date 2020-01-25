import express from "express";
const router = express.Router();
import mysql from "mysql";
import passport from "passport";
import passportLocal from "passport-local";
const LocalStrategy: typeof passportLocal.Strategy = passportLocal.Strategy;

//데이터베이스 세팅
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ljk041180",
  database: "terrydb"
});
connection.connect();

//로그인 화면
router.get("/", function(req, res) {
  var _msg: string = req.body.message;
  res.render("login.ejs", { message: _msg });
});

//패스포트 직렬화
passport.serializeUser(function(user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

//회원가입
passport.use(
  "sign-up",
  new LocalStrategy(
    {
      usernameField: "signUp_email",
      passwordField: "signUp_password",
      passReqToCallback: false
    },
    function(email: string, password: string, done) {
      console.log("이메일 검사를 시작합니다.");
      //입력받은 이메일이 디비에 있는지 조회
      const query: mysql.Query = connection.query(
        "select * from user where email=?",
        [email],
        function(err, rows) {
          if (err) return done(err);
          if (rows.length) {
            console.log("이미 존재하는 유저입니다.");
            return done(null, false, {
              message: "입력한 이메일은 이미 사용중입니다."
            });
          }
          //없으면 디비에 입력
          else {
            const data = { email: email, password: password };
            const query: mysql.Query = connection.query(
              "insert into user set ?",
              data,
              function(err, rows) {
                if (err) throw err;
                return done(null, { email: email, id: rows.insertId });
              }
            );
          }
        }
      );
    }
  )
);

//회원가입 버튼 누르면 여가로
router.post("/sign_up", function(req, res) {
  // res.send(req.body);
  passport.authenticate("sign-up", {
    successRedirect: "/auth",
    failureRedirect: "/auth#sign_up",
    failureFlash: true
  });
});

export = router;
