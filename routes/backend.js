var express         = require("express"),
    backend_router  = express.Router(),
    admin_router    = require("./admin"),
    http_error      = require("../util/http_error"),
    login           = require("../controllers/backend/login"),
    admin           = require("../controllers/backend/admin");

exports.router = backend_router;

// admin router module
backend_router.route("/").get(login.page)
backend_router.route("/login").get(login.page).post(login.sign_in)
backend_router.route("/reset-password/:id").get(login.reset_password_page).post(login.reset_password_action)
backend_router.post("/reg", admin.create)
backend_router.post("/forgot-password", login.forgot_password)
backend_router.get("/logout", login.logout)

backend_router.use("/admin", admin_router.router)
// 404 page
// backend_router.all("*", http_error.http404);