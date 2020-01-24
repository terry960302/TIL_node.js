const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

//라우터
var main = require("./router/main");

//mysql 데이터베이스 연동
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ljk041180",
  database: "terrydb"
});
connection.connect();

var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("시작합니다. 3000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.use("/main", main);

app.post("/email_post", function(req, res) {
  console.log(req.body);
  res.render("email.ejs", { email: req.body.email });
  //   res.send("<h1> Welcome! </h1>" + req.body.email);
});

app.post("/ajax_send_email", function(req, res) {
  console.log(req.body.email);
  //check validation about input value = select db
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

//practice
// app.post("/post_test", (req, res) => {
//   res.render("test2.ejs", { myName: req.body.name, myEmail: req.body.email });
// });

// app.post("/ajax_test", (req, res) => {
//   console.log(req.body);
//   var responseData = {
//     success: true,
//     name: req.body.name,
//     email: req.body.email
//   };
//   res.json(responseData);
// });
