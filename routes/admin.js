var express         = require("express"),
    admin_router    = express.Router(),
    http_error      = require("../util/http_error"),
    admin           = require("../controllers/backend/admin");

exports.router = admin_router;

// 检查是否登录
admin_router.use(function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.send_failure("没有登录", "请重新登录", "/backend/login")
})

admin_router.route("/profile").get(admin.profile)

