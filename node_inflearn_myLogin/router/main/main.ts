import express from "express";
const router = express.Router();

router.get("/main", (req, res, next) => {
  res.send("메인페이지입니다.");
});

export = router;
