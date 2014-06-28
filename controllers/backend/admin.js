var async       = require("async"),
    model_admin = require("../../models/admins");

exports.create = function(req, res, next) {
    async.waterfall([

        // validator 
        function(callback) {
            if (req.body.password !== req.body.password_verify) {
                return callback("两次密码输入不一致")
            }

            if (!req.body.agree_terms) {
                return callback("必须同意服务条款才能注册")
            }

            callback(null)
        },

        // get params and save to db
        function(callback) {
            model_admin.create_admin(req.body.email, req.body.password, function(err) {
                callback(err)
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

exports.profile = function(req, res) {
    console.log(req.user)
    res.render("backend/profile/index")
}













