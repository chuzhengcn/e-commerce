var express     = require("express"),
    router      = express.Router(),
    model_admin = require("../../models/admins");


exports.create = function(req, res, next) {
    new model_admin({
        email : "chuzhengcn@gmail.com",
        password : "123456"
    }).save()
}