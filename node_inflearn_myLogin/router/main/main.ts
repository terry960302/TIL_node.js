import express from "express";
const router = express.Router();
import mysql from "mysql";

//mysql 데이터베이스 연동
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ljk041180",
  database: "terrydb"
});
connection.connect();

router.get("/", (req, res, next) => {
  //세션에 저장된 id
  var id: Express.User | undefined = req.user;
  var email: string;

  //세션에 있는 id로 이메일을 반환
  const query = connection.query(
    "select * from user where UID=?",
    [id],
    (err, rows) => {
      if (err) return;
      if (rows.length) {
        email = rows[0].email;
        res.render("main.ejs", { email: email });
      } else {
        console.log("id로 이메일을 조회하는데 문제가 발생했습니다.");
      }
    }
  );
});

export = router;
