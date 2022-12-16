const express = require('express');
const router = express.Router();
const passport = require('passport');

const { test, getCurrentUser, logoutUser, googleLoginFailed, googleLoginSuccess, register, login, verifyAccount, resendLink } = require('../app/constrollers/user');
const { checkLoggedIn } = require('../config/security/auth');
const { CLIENT_URL } = require('../utils/Constants');

router.get('/test', checkLoggedIn, test);
router.post('/register', register);
router.get('/confirmation/:email/:token', verifyAccount);
router.post('/resend', resendLink);
router.post('/login', login)

router.get('/get-current', checkLoggedIn, getCurrentUser);
router.get('/auth/logout', logoutUser);
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email'],
}));

router.get('/auth/google/login/failed', googleLoginFailed);
router.get('/auth/google/login/success', googleLoginSuccess);
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/google/login/failed',
    successRedirect: CLIENT_URL,
}), (req, res) => {
    console.log('Login success!')
});

module.exports = router;
