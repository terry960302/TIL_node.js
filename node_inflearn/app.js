const express = require("express");
const bodyParser = require("body-parser");

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
  //check validation about input value = select db
  var responseData = { result: "ok", email: req.body.email };
  res.json(responseData);
});

//practice
app.post("/post_test", (req, res) => {
  res.render("test2.ejs", { myName: req.body.name, myEmail: req.body.email });
});

app.post("/ajax_test", (req, res) => {
  console.log(req.body);
  var responseData = {
    success: true,
    name: req.body.name,
    email: req.body.email
  };
  res.json(responseData);
});
