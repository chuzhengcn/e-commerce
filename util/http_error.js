exports.http404 = function (req, res, next) {
    if (req.accepts("html")) {
        res.status(404).render('404');
    } else {
        res.send(404)
    }
}

exports.http500 = function(err, req, res, next) {
    if (req.app.get('env') === 'development') {
        return next()
    }

    if (req.accepts("html")) {
        res.status(500).render("500")
    } else {
        res.send(500)
    }
}