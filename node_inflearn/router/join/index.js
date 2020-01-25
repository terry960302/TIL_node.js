const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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
  res.render("join.ejs", { message: msg });
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
  "local-join",
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

          if (rows.length) {
            console.log("existed user");
            return done(null, false, { message: "your email is already used" });
          } else {
            var sql = { email: email, pw: password };
            var query = connection.query(
              "insert into user set ?",
              sql,
              (err, rows) => {
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

router.post(
  "/",
  passport.authenticate("local-join", {
    successRedirect: "/main",
    failureRedirect: "/join",
    failureFlash: true
  })
);

// router.post("/", (req, res) => {
//   var body = req.body;
//   var email = body.email;
//   var name = body.name;
//   var passwd = body.password;

//   //회원 디비에 추가
//   var sql = { email: email, name: name, pw: passwd };
//   var query = connection.query("insert into user set ?", sql, (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     console.log("잘했어요 : ", rows.insertId, name);
//     res.render("welcome.ejs", { name: name, id: rows.insertId });
//   });
// });
module.exports = router;
