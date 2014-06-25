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