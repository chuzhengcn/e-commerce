var helper = require("./helper");

exports = module.exports = function(req, res, next) {
    var default_return_url = "/",
        default_failure_code = -1,
        default_success_code = 0,
        default_failure_msg = "操作失败",
        default_success_msg = "操作成功",
        default_data        = "[]",
        is_json_req         = req.accepts("json") && req.is("json");
        
    if (is_json_req) {
        res.send_success = function(msg, data) {
            res.send({
                code : default_success_code, 
                msg : msg || default_success_msg, 
                data : data || default_data
            })
        }

        res.send_failure = function(err, msg, code) {
            var message = helper.get_error_message(err);

            if (msg) {
                message = msg;
            }

            res.send({
                code : code || default_failure_code, 
                msg : message || default_failure_msg
            })
        }
    } else {
        res.send_success = function(msg, data, return_url) {
            res.render(get_template(req, "success"), {
                msg         : msg || default_success_msg,
                code        : default_success_code,
                data        : data || default_data,
                return_url  : return_url || default_return_url,
            })
        }

        res.send_failure = function(err, msg, return_url, code) {
            var message = helper.get_error_message(err);

            if (msg) {
                message = msg;
            }
            
            res.render(get_template(req, "failure"), {
                msg         : message || default_failure_msg,
                code        : code || default_failure_code,
                return_url  : return_url || default_return_url,
            })
        }
    }

    next()
}

function get_template(req, template_name) {
    var page = {
        "backend" : {
            success : "backend/success",
            failure : "backend/failure"
        },
        "frontend" : {
            success : "frontend/success",
            failure : "frontend/failure"
        }
    };

    if (req.originalUrl.indexOf("backend") > -1) {
        return page.backend[template_name]
    } else {
        return page.frontend[template_name]
    }
}