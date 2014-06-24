var express     = require("express"),
    async       = require("async"),
    router      = express.Router(),
    model_admin = require("../../models/admins");

exports.create = function(req, res, next) {
    console.log(req.body)
    async.waterfall([

        // validator 
        function(callback) {
            if (req.body.password !== req.body.password_verify) {
                return callback(new Error("两次密码输入不一致"))
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
            console.log(err)
            res.send_failure(err.message)
        } else {
            res.send_success()
        }
    })
}