var bcrypt   = require('bcrypt');

function get_error_message(err) {
    console.log(err)

    // custom error
    if (typeof err === "string") {
        return err
    }

    if (err === null) {
        return ""
    }

    // mongo error 
    if (err.name === "MongoError") {
        if (err.code === 11000) {
            return err.err.slice(err.err.indexOf('dup key') + 12, -1) + " 不唯一"
        }

        return "数据库错误"
    }

    // mongoose error
    if (err.errors) {
        var msg = ""
        for (var key in err.errors) {
            msg += err.errors[key].message + " "
        }

        return msg
    }

    if (err.message) {
        return err.message
    }

    return "未知错误"

}

exports.get_error_message = get_error_message;

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

exports.encryptPassword = encryptPassword;

// 校验密码
function validatePassword(password, hash, cb) {
    bcrypt.compare(password, hash, function(err, result) {
        cb(err, result);
    });
};

exports.validatePassword = validatePassword;