import * as express from "express";
import * as path from "path";
const router = express.Router();
import auth from "./auth/auth";

//라우팅 등록
router.use("/auth", auth);

//첫화면
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/start.html"));
});

export = router;
