const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const route = require('../routes/index');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const passport = require('passport');
const {Strategy} = require('passport-google-oauth2')
const { AUTH_CONFIG } = require('../utils/Constants')
const { verifyCallback } = require('../config/security/auth');

const { COOKIE_KEY_1, COOKIE_KEY_2 } = require('../utils/Constants');

passport.use(new Strategy(AUTH_CONFIG, verifyCallback))
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    done(null, id)
})
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

// config security
app.use(helmet());
app.use(cookieSession({
    name: 'session',
    maxAge: 60 * 60 * 24 * 1000,
    keys: [COOKIE_KEY_1, COOKIE_KEY_2]
}));
app.use(passport.initialize());
app.use(passport.session());

// config app
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..','..', 'public'));
})

route(app);
module.exports = app;