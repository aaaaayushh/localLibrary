var express = require("express");
const app = require("../app");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.send("I'm so cool damn");
});

module.exports = router;
