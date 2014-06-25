var express         = require("express"),
    backend_router  = express.Router(),
    http_error      = require("../util/http_error"),
    login           = require("../controllers/backend/login"),
    admin           = require("../controllers/backend/admin");

exports.router = backend_router;

// admin router module
backend_router.route("/")
.get(login.page)

backend_router.route("/login")
.get(login.page)
.post(login.sign_in)

backend_router.post("/reset-password", login.reset_password)
backend_router.post("/reg", admin.create)

// 404 page
backend_router.all("*", http_error.http404);