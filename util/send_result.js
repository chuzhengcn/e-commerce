exports = module.exports = function(req, res, next) {
    var default_return_url = "/",
        default_failure_code = -1,
        default_success_code = 0,
        default_failure_msg = "操作失败",
        default_success_msg = "操作成功",
        default_data        = "[]";
        

    if (req.is('html')) {
        if (res.result.ok) {
            res.render(get_template(req, "success"), {
                msg         : res.result.msg || default_success_msg,
                code        : default_success_code,
                return_url  : res.result.return_url || default_return_url,
                data        : res.result.data || default_data,
            })
        } else {
            res.render(get_template(req, "failure"), {
                msg         : res.result.msg || default_failure_msg,
                code        : res.result.code || default_failure_code,
                return_url  : res.result.return_url || default_return_url,
            })
        }

        return
    }

    if (req.is('json')) {
        if (res.result.ok) {
            res.send({code : default_success_code, msg : res.result.msg || default_success_msg, data : res.result.data || default_data})
        } else {
            res.send({code : res.result.code || default_failure_code, msg : res.result.msg || default_failure_msg})
        }

        return
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

    if (req.path.indexOf("backend") > -1) {
        return page.backend[template_name]
    } else {
        return page.frontend[template_name]
    }
}