var async       = require("async"),
    model_admin = require("../../models/admins");

exports.create = function(req, res, next) {
    console.log(req.body)
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
            var doc = new model_admin({
                email : req.body.email,
                password : req.body.password
            })

            doc.save(function(err) {
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

