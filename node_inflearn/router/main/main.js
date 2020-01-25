const express = require("express");
var path = require("path");
var router = express.Router();

router.get("/", function(req, res) {
  var id = req.user;
  res.render("main.ejs", { id: id });
});

module.exports = router;
