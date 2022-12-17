const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const route = require('../routes/index');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {Strategy} = require('passport-google-oauth2')
const { AUTH_CONFIG, CLIENT_URL } = require('../utils/Constants')
const { verifyCallback, verifyUser } = require('../config/security/auth');
// const session = require('express-session');

const { COOKIE_KEY_1, COOKIE_KEY_2 } = require('../utils/Constants');

passport.use(new Strategy(AUTH_CONFIG, verifyCallback))
passport.use(new localStrategy({usernameField: 'email'}, verifyUser))

passport.serializeUser((user, done) => {
    console.log('serialize: ', user);
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log('deserialize: ', id);
    done(null, id)
})
const app = express();
app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..','..', 'public'));
});
app.use(express.json());

// config security
app.use(helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
}));
app.use(cookieSession({
    name: 'session',
    maxAge: 60 * 60 * 24 * 1000,
    keys: [COOKIE_KEY_1, COOKIE_KEY_2]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

// config app
app.use(morgan('combined'));


app.get('/emit', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/emit.html"));
})
app.get('/visual', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/visual.html"));
})
route(app);
module.exports = app;