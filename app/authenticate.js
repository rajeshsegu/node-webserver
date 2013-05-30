var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./schemas/user');

// Passport methods
passport.use( new LocalStrategy({usernameField: 'email'},function(email, password, done) {
    User.authenticate(email, password, function(err, user) {
        return done(err, user)
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id)
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    });
});

// Function to only allow acess if authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    // Redirect if not authenticated
    res.redirect('/account/login');
}

function login(req, res, next){
    passport.authenticate('local', function(err, user, info) {
            if (err){return next(err);} 
            if (!user) { return res.send({st:"fail"})} 
            req.logIn(user, function(err) { 
                if (err) { return next(err); } 
                return res.redirect('/');
            });
        })(req, res, next);
}

function logout(req, res, next){
        // Passport logout function
        req.logout();
        
        // Redirect to home page
        return res.redirect('/');    
}

module.exports = {
    ensureAuthenticated: ensureAuthenticated,
    login:   login,
    logout: logout
}
