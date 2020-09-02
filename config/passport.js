const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');

// 1st work is to serialize(save the data on server not in the db) the data :
passport.serializeUser((user, done) => {
    console.log('serialize');
    done(null, user._id);
});

// 2nd work is to deserialize the data :
passport.deserializeUser((id, done) => {
    console.log('deserialize');
    User.findById(id, (err, user) => done(err, user));
});

passport.use('signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return done(null, false, { message: 'That email is not registered' })
            } else {
                // Matching Passwords :
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) return done(null, user);
                    else return done(null, false, { message: 'Password is incorrect' });
                })
            }
        })
        .catch(err => console.log(err))
}
))