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
                text    : req.protocol +'://'+ req.headers.host +'/backend/reset-password/'+ doc._id +'/'+ doc.reset_password_token
            },function(err, message) {
                if (err) {
                    console.log(err)
                    return callback("发送邮件到" + doc.email + "失败")
                }

                callback(null, message)
            })
        }
    ],
    function(err, result) {
        if (err) {
            return res.send_failure(err)
        }

        res.send_success()
    })
}

exports.reset_password_page = function(req, res, next) {
    var email = req.params.email,
        token = req.params.token;

    res.render("/statics/backend/reset-password")
}




































