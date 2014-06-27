var async           = require("async"),
    helper          = require("../../util/helper"),
    email_sender    = require("../../util/send_email"),
    model_admin     = require("../../models/admins");

exports.page = function(req, res, next) {
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

exports.forgot_password = function(req, res) {
    async.waterfall([

        // generateToken
        function(callback) {
            model_admin.generate_forgot_token(req.body.email, function(err, doc) {
                callback(err, doc)
            })            
        },

        // send mail
        function(doc, callback) {
            email_sender.send_text_only({
                to      : doc.email,
                subject : "重置密码邮件",
                text    : "重置密码的验证码：" + doc.reset_password_token
            },function(err, message) {
                if (err) {
                    console.log(err)
                    return callback("发送邮件到" + doc.email + "失败")
                }

                callback(null, doc._id)
            })
        }
    ],
    function(err, result) {
        if (err) {
            return res.send_failure(err)
        }

        res.send_success("申请重置密码", result)
    })
}

exports.reset_password_page = function(req, res, next) {
    res.render("backend/reset-password")
}

exports.reset_password_action = function(req, res, next) {
    var id = req.params.id,
        token = req.body.token,
        password = req.body.password,
        password_verify = req.body.password_verify;

    async.waterfall([

        // validate
        function(callback) {
            if (password !== password_verify) {
                return callback("两次输入的密码不一致")
            }

            callback(null)
        },

        // call model static method
        function(callback) {
            model_admin.reset_password(id, token, password, function(err) {
                if (err) {
                    return callback(err)
                }

                callback(null)
            })
        } 
    ],
    function(err) {
        if (err) {
            res.send_failure(err)
        } else {
            res.send_success()
        }
    })
}




































