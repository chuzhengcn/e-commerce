var express         = require("express"),
    app_router      = express.Router(),
    backend_router  = require("./backend").router,
    http_error      = require("../util/http_error");

exports.router = app_router;

// app
app_router.use("/backend", backend_router);