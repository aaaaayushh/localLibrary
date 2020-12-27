var express = require("express");
var router = express.Router();

var app = express();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("booglie bum bum dum");
});

module.exports = router;
