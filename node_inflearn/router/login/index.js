const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

//mysql 데이터베이스 연동
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ljk041180",
  database: "terrydb"
});
connection.connect();

router.get("/", function(req, res) {
  var msg;
  var errMsg = req.flash("error");
  if (errMsg) msg = errMsg;
  res.render("login.ejs", { message: msg });
});

passport.serializeUser((user, done) => {
  console.log("passport session save , id : ", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("passport session get id: ", id);
  done(null, id);
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      var query = connection.query(
        "select * from user where email=?",
        [email],
        (err, rows) => {
          if (err) return done(err);
          //디비에 같은 이메일이 있을 경우(회원일 경우)
          if (rows.length) {
            console.log(rows);
            return done(null, { email: email, id: rows[0].UID });
          }
          //새로운 사람이 로그인할 경우
          else {
            return done(null, false, { message: "Login Info is not found!" });
          }
        }
      );
    }
  )
);

router.post("/", (req, res, next) => {
  passport.authenticate("local-login", (err, user, info) => {
    if (err) res.status(500).json(err);
    if (!user) {
      return res.status(401).json(info.message);
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.json(user);
    });
  })(req, res, next);
});
module.exports = router;
