var async       = require("async"),
    model_admin = require("../../models/admins");

exports.page = function(req, res, next) {
    res.render("backend/login")
}

exports.sign_in = function(req, res, next) {
    console.log(req.body)
    model_admin.validate_identity(req.body.email, req.body.password, function(err, valid) {
        if (err) {
            return res.send_failure(err)
        }

        if (!valid) {
            return res.send_failure("登录失败")
        }

        res.send_success()
    })
}

exports.reset_password = function(req, res, next) {
    res.json({ret : 0})
}