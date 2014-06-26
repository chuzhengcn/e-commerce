'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    async    = require("async"),
    moment   = require("moment"),
    crypto   = require('crypto'),
    helper   = require("../util/helper");

// define 
var Admin = new Schema({
    email : {
        type        : String,
        required    : "邮箱必填", 
        match       : [/^[a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_]+$/, "{VALUE} 不是一个合法的邮箱"],
        index       : {
            unique: true
        },
        lowercase   : true, 
        trim        : true
    },
    name : {
        type    : String, 
        default : "",
        trim : true,
        match : [/\S{1,10}/, "{VALUE} 不是合法的名字，长度必须小于10"]
    },
    password : {
        type        : String,
        required    : "密码必填",
        trim        : true,
        match       : [/\S{6,16}$/, "密码6－16位"]
    },
    is_active : {
        type        : String,
        trim        : true,
        lowercase   : true,
        default     : "yes",
        enum        : {
            values  : 'yes no'.split(' '), 
            message : "{VALUE} 不是合法的 {PATH}"
        }
    },
    reset_password_token : {
        type : String
    },
    reset_password_expires : {
        type : Date
    },
    created_at : {
        type    : Date, 
        default : Date.now
    },
    updated_at : {
        type    : Date,
        default : Date.now
    }
})

// middleware -- encrptPassword
Admin.pre("save", true, function(next, done) {
    if (!this.password) {
        next()
        done()
        return
    }

    var self = this

    helper.encryptPassword(self.password, function(err, hash) {
        if (err) {
            return next(err)
        }

        self.password = hash
        next()
        done()
    })

})

// static method ---------------------------------------------------
Admin.statics.validate_identity = function(email, password, cb) {
    var self = this;

    async.waterfall([

        // validate params
        function(callback) {
            if (typeof email === 'undefined') {
                return callback("邮箱必填")
            }

            if (typeof password === 'undefined') {
                return callback("密码必填")
            }

            callback(null)
        },

        // get admin
        function(callback) {
            self.findOne({email : email}, function(err, doc) {
                if (err) {
                    return callback(err)
                }

                if (doc === null) {
                    return callback("不存在该用户")
                }

                callback(null, doc)

            })
        },

        // validate password
        function(doc, callback) {
            helper.validatePassword(password, doc.password, function(err, passed) {
                if (err) {
                    return callback(err)
                }

                if (!passed) {
                    return callback("密码错误")
                }

                callback(null, doc)
            })
        }
    ], 
    function(err, valid) {
        cb(err, valid)
    })
}

Admin.statics.generate_forgot_token = function(email, cb) {
    var self = this,
        expires_time = 1000 * 60 * 30; //30min

    email = email && email.toLocaleLowerCase();

    async.waterfall([

        // generateToken
        function(callback) {
            crypto.randomBytes(21, function(err, buf) {
                if (err) {
                    return callback(err);
                }

                var token = buf.toString('hex');

                helper.encryptPassword(token, function(err, hash) {
                    if (err) {
                        return callback(err)
                    }

                    callback(null, hash)
                })
            });
        },

        // save to db
        function(hash, callback) {
            self.findOne({email : email}, function(err, doc) {
                if (err) {
                    return callback(err)
                }

                if (!doc) {
                    return callback("用户不存在")
                }

                doc.reset_password_token = hash;
                doc.reset_password_expires = Date.now() + expires_time;

                doc.save(function(err, doc) {
                    callback(err, doc)
                })
            })
        },
    ],
    function(err, result) {
        cb(err, result)
    })
} 


module.exports = mongoose.model('admins', Admin);