const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');
require('./models/db');//database

const app = express();

// setting up the view engine :
app.use(expressLayouts);
app.set('view engine', 'ejs');

// setting up the session :
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

// passport middleware :
app.use(passport.initialize());//invokes or calls serialize method
app.use(passport.session());//invokes or calls deserialize method

// parsing the data :
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (e) => {
    if (e) throw e;
    console.log(`Server is on port : ${PORT}`);
});