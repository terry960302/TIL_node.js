const express = require("express");
var path = require("path");
var router = express.Router();

//메인페이지는 로그인이 될떄만(세션 정보가 있을떄만) 접근이 가능
router.get("/", function(req, res) {
  var id = req.user;
  console.log("main is loaded", id);
  if (!id) res.render("login.ejs");
  res.render("main.ejs", { id: id });
});

module.exports = router;
