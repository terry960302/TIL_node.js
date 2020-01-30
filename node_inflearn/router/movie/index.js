const express = require("express");
const app = express();
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

router.get("/list", (req, res) => {
  res.render("movie.ejs");
});

router.get("/", (req, res) => {
  var responseData = {};

  const query = connection.query("select title from movie", (err, rows) => {
    if (err) throw err;
    if (rows.length) {
      console.log(rows);
      responseData.result = 1;
      responseData.data = rows;
    } else {
      responseData.result = 0;
    }

    res.json(responseData);
  });
});

module.exports = router;
