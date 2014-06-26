module.exports = function(app, passport) {
    var LocalStrategy = require('passport-local').Strategy,
        Admin    = require("../../models/admins");


    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        Admin.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({usernameField: 'email',passwordField: 'password'},
        function(email, password, done) {
            Admin.validate_identity(email, password, function(err, admin) {
                if (err) {
                    return done(err)
                }

                if (!admin) {
                    return done(err, null)
                }

                done(null, admin)
            })  
        }
    ));

    app.passport = passport;
}