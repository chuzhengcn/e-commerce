var express = require("express"),
    router  = express.Router();

exports.router = router;

router.route("/")
.all(function(req, res, next) {
    res.render("admin/login")
})