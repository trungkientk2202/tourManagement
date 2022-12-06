const express = require('express');
const router = express.Router();
const passport = require('passport');

const { test, getCurrentUser, logoutUser, googleLoginFailed, googleLoginSuccess } = require('../app/constrollers/user');
const { checkLoggedIn } = require('../config/security/auth');
const { CLIENT_URL } = require('../utils/Constants');

router.get('/test', checkLoggedIn, test);
router.get('/get-current', checkLoggedIn, getCurrentUser);
router.get('/auth/logout', logoutUser);
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email'],
}), (req, res) => {
    console.log("Google auth success");
});

router.get('/auth/google/login/failed', googleLoginFailed);
router.get('/auth/google/login/success', googleLoginSuccess);

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/google/login/failed',
    successRedirect: CLIENT_URL,
    session: true,
}), (req, res) => {
    console.log('Login success!')
});

module.exports = router;