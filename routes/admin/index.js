var express = require("express"),
    router  = express.Router();

exports.router = router;

router.route("/")
.all(function(req, res, next) {
    console.log(req.query)
    res.json({err : null})
})