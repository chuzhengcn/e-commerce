exports.page = function(req, res, next) {
    res.render("backend/login")
}

exports.sign_in = function(req, res, next) {
    res.json({ret : 0})
}

exports.reset_password = function(req, res, next) {
    res.json({ret : 0})
}