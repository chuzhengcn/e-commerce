var async       = require("async"),
    model_admin = require("../../models/admins");

exports.page = function(req, res, next) {
    console.log(req.user)
    res.render("backend/login")
}

exports.sign_in = function(req, res, next) {
    req.app.passport.authenticate('local', function(err, admin) {
        if (err) {
            return res.send_failure(err)
        }

        if (!admin) {
            return res.send_failure("登录失败")
        }

        req.login(admin, function(err) {
            if (err) {
                return res.send_failure(err)
            }

            res.send_success()
        })
    })(req, res, next)
}

exports.reset_password = function(req, res, next) {
    res.json({ret : 0})
}