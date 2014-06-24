var express     = require("express"),
    router      = express.Router(),
    http_error  = require("./util/http_error"),
    login       = require("./login"),
    admin       = require("./admin");

exports.router = router;

router.route("/")
.get(login.page)


router.post("/login", login.sign_in)
router.post("/reset-password", login.reset_password)
router.post("/reg", admin.create)

// 404 page
router.all("*", http_error.http404);