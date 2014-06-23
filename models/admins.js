'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    bcrypt   = require('bcrypt'),
    async    = require("async"),
    moment   = require("moment");

// define 
var Admin = new Schema({
    name : {
        type    : String, 
        default : "", 
        index : {
            unique  : true
        }, 
        trim : true,
        // match : [/^{1,10}$/, "{VALUE} 不是合法的名字，长度必须小于10"]
    },
    password : {
        type        : String,
        required    : "密码必填",
        trim        : true,
        // match       : [/^{6,16}$/, "密码6－16位"]
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
    created_at : {
        type    : Date, 
        default : Date.now
    },
    updated_at : {
        type    : Date,
        default : Date.now
    }
})

// middleware
Admin.pre("save", function(next, done) {
    console.log(this)
})

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

module.exports = mongoose.model('admins', Admin);