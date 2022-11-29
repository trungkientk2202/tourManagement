const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const route = require('../routes/index');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const passport = require('passport');
const {Strategy} = require('passport-google-oauth2')
const AUTH_CONFIG = require('../config/security/auth')
const {verifyCallback, checkLoggedIn} = require('../config/security/login');
const { findUser } = require('../models/user.model');


require('dotenv').config();

passport.use(new Strategy(AUTH_CONFIG, verifyCallback))
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    done(null, id)
})
const app = express();
app.use(cors({
    origin: "http://localhost:3000"
}));

// config security
app.use(helmet());
app.use(cookieSession({
    name: 'session',
    maxAge: 60 * 60 * 24 * 1000,
    keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2]
}));
app.use(passport.initialize());
app.use(passport.session());
// app.get('/auth/google', passport.authenticate('google', {
//     scope: ['email'],
// }), )
// app.get('/auth/google/callback', passport.authenticate('google', {
//     failureRedirect: '/failure',
//     successRedirect: '/',
//     session: true,
// }), (req, res) => {
//     console.log('Google is called us back!')
// })
// app.get('/auth/logout', (req, res) => {
//     req.logOut()
//     return res.redirect('/')
// })

// config app
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/secret', checkLoggedIn, (req, res) => {
    res.send("Hahaahhahaah")
})
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..','..', 'public', 'index.html'));
})

route(app);
module.exports = app;