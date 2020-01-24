const express = require("express");
const router = express.Router();

//practice
router.post("/post_test", (req, res) => {
  res.render("test2.ejs", { myName: req.body.name, myEmail: req.body.email });
});

router.post("/ajax_test", (req, res) => {
  console.log(req.body);
  var responseData = {
    success: true,
    name: req.body.name,
    email: req.body.email
  };
  res.json(responseData);
});

module.exports = router;
