var express = require("express"),
    router  = express.Router(),
    login   = require("./login");

exports.router = router;

router.route("/")
.get(login.page)