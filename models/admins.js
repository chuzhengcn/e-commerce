'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    bcrypt   = require('bcrypt'),
    async    = require("async"),
    moment   = require("moment");

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

    encryptPassword(self.password, function(err, hash) {
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
            validatePassword(password, doc.password, function(err, passed) {
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

// helper ---------------------------------------------------------------------------

// 生成密码函数
function encryptPassword(password, cb) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return cb(err);
        }

        bcrypt.hash(password, salt, function(err, hash) {
            cb(err, hash);
        });
    });
}

// 校验密码
function validatePassword(password, hash, cb) {
    bcrypt.compare(password, hash, function(err, result) {
        cb(err, result);
    });
};

module.exports = mongoose.model('admins', Admin);