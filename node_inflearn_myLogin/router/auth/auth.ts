import express from "express";
const router = express.Router();
import mysql from "mysql";
import passport from "passport";
import passportLocal from "passport-local";
const LocalStrategy: typeof passportLocal.Strategy = passportLocal.Strategy;

//mysql 데이터베이스 연동
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ljk041180",
  database: "terrydb"
});
connection.connect();

//탬플릿 렌더링
router.get("/", (req: any, res: any) => {
  var msg;
  var errMsg = req.flash("error");
  if (errMsg) msg = errMsg;
  res.render("auth.ejs", { message: msg });
});

//세션에 저장
passport.serializeUser((user: any, done: any) => {
  console.log("세션에 저장되었습니다. => id : ", user.id);
  done(null, user.id);
});

//저장된 정보 복호화
passport.deserializeUser((id: any, done: any) => {
  console.log("세션에서 id를 가져옵니다. =>  id: ", id);
  done(null, id);
});

//미들웨어 회원가입 설정
passport.use(
  "local-sign-up",
  new LocalStrategy(
    {
      usernameField: "signUp_email",
      passwordField: "signUp_password",
      passReqToCallback: true
    },
    (req: any, email: string, password: string, done: any) => {
      const query = connection.query(
        "select * from user where email=?",
        [email],
        (err: any, rows: any) => {
          if (err) return done(err);

          if (rows.length) {
            console.log("이미 가입한 회원입니다.");
            return done(null, false, { message: "이미 가입한 회원입니다." });
          } else {
            var sql = { email: email, pw: password };
            const query = connection.query(
              "insert into user set ?",
              sql,
              (err: any, rows: any) => {
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

//미들웨어 로그인 설정
passport.use(
  "local-sign-in",
  new LocalStrategy(
    {
      usernameField: "signIn_email",
      passwordField: "signIn_password",
      passReqToCallback: true
    },
    (req: any, email: string, password: string, done: any) => {
      const query = connection.query(
        "select * from user where email=?",
        [email],
        (err: any, rows: any) => {
          if (err) return done(err);

          //디비에 이메일이 존재
          if (rows.length) {
            if (rows[0].pw === password) {
              console.log("로그인에 성공했습니다.");
              return done(null, { email: email, id: rows[0].UID });
            } else {
              console.log("비밀번호가 다릅니다.");
              return done(null, false, {
                message: "비밀번호가 다릅니다."
              });
            }
          } else {
            console.log("이메일이 디비에 없습니다.");
            return done(null, false, { message: "회원이 아닙니다." });
          }
        }
      );
    }
  )
);

//회원가입
router.post(
  "/sign_up",
  passport.authenticate("local-sign-up", {
    successRedirect: "/auth",
    failureRedirect: "/auth#sign_up",
    failureFlash: true
  })
);

//로그인
router.post(
  "/sign_in",
  passport.authenticate("local-sign-in", {
    successRedirect: "/main",
    failureRedirect: "/auth",
    failureFlash: true
  })
);

// router.post("/sign_in", (req, res, next) => {
//   passport.authenticate("local-sign-in", (err, user, info) => {
//     if (err) res.status(500).json(err);
//     if (!user) {
//       return res.status(401).json(info.message);
//     }
//     req.logIn(user, function(err) {
//       if (err) return next(err);
//       return res.json(user);
//     });
//   })(req, res, next);
// });

export = router;
