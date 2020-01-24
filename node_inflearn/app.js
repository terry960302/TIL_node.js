const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/main", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", function(req, res) {
  console.log(req.body);
  res.render("email.ejs", { email: req.body.email });
  //   res.send("<h1> Welcome! </h1>" + req.body.email);
});

app.post("/ajax_send_email", function(req, res) {
  console.log(req.body.email);
});

app.listen(3000, () => {
  console.log("시작합니다. 3000");
});
