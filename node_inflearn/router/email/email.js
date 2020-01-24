const express = require("express");
const router = express.Router();
const mysql = require("mysql");

//mysql 데이터베이스 연동
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ljk041180",
  database: "terrydb"
});
connection.connect();

router.post("/form", function(req, res) {
  console.log(req.body);
  res.render("email.ejs", { email: req.body.email });
});

router.post("/ajax", function(req, res) {
  var email = req.body.email;
  var responseData = {};

  //쿼리
  var query = connection.query(
    'select name from user where email="' + email + '"',
    (err, rows) => {
      if (err) throw err;
      if (rows[0]) {
        responseData.result = "ok";
        responseData.name = rows[0].name;
      } else {
        responseData.result = "none";
        responseData.name = "";
      }
      //클라이언트에게 json 파일을 던져줌.
      res.json(responseData);
    }
  );
});

module.exports = router;
