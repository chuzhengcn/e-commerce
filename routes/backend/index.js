var express = require("express"),
    router  = express.Router(),
    login   = require("./login"),
    user    = require("./user");

exports.router = router;

router.route("/")
.get(login.page)


router.post("/login", login.sign_in)
router.post("/reset-password", login.reset_password)
router.post("/reg", user.create)