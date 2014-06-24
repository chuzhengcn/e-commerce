var express         = require("express"),
    app_router      = express.Router(),
    admin_router    = express.Router(),
    http_error      = require("./util/http_error"),
    back_login      = require("./controllers/backend/login"),
    back_admin      = require("./controllers/backend/admin");

exports.router = app_router;

// app
app_router.use("/backend", admin_router);


// admin router module
admin_router.route("/")
.get(back_login.page)

admin_router.post("/login", back_login.sign_in)
admin_router.post("/reset-password", back_login.reset_password)
admin_router.post("/reg", back_admin.create)

// 404 page
admin_router.all("*", http_error.http404);

// app 404
admin_router.all("*", http_error.http404);
