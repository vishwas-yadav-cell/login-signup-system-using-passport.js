const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');

router.get('/login', NotLoggedIn,(req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {

    const { name, email, password, password2 } = req.body;
    const errors = [];

    // checking have values :
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Must fill all the fields' });
    }

    // passwords compare checking :
    if (password !== password2) {
        errors.push({ msg: 'Passwords must be equal' });
    }

    // password length checking :
    if (password.length < 6) {
        errors.push({ msg: 'Password must be greater than 5 length' });
    }

    if (password.length > 12) {
        errors.push({ msg: 'Password must be shorter than 13 length' });
    }

    // checking errors :
    if (errors.length > 0) {
        res.render('register', { errors, name, email, password, password2 });
    } else {
        User.findOne({ email: email }, (e, have) => {
            if (have) {
                errors.push({ msg: 'This email is already taken!' });
                res.render('register', ({ errors, name, email, password, password2 }));
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(() => res.redirect('/dashboard'))
                            .catch(e => console.log(e))
                    })
                })
            }
        })
    }
})

// login handle :
router.post('/login',passport.authenticate('signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login'
}))

// logout handle :
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/users/login');
});

function NotLoggedIn(req,res,next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/dashboard');
}

module.exports = router;