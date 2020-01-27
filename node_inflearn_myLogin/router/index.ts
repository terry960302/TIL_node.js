import * as express from "express";
import * as path from "path";
const router = express.Router();
import auth from "./auth/auth";
import main from "./main/main";

//라우팅 등록
router.use("/auth", auth);
router.use("/main", main);

//루트 화면
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/start.html"));
});

export = router;
