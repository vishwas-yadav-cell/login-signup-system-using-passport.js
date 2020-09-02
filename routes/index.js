const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    res.render('welcome');
});

router.get('/dashboard',isloggedIn,(req, res)=>{
    res.render('dashboard');
});

// login checker function :
function isloggedIn(req,res,next){
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
}

module.exports = router;