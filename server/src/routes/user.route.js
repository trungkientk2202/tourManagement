const express = require('express');
const router = express.Router();

const { test, getCurrentUser, logoutUser, register, login, verifyAccount, resendLink, forgotPassword, resetPassword, edit } = require('../app/constrollers/user');
const { checkLoggedIn } = require('../config/security/auth');
const passport = require('passport');

router.get('/test', checkLoggedIn, test);
router.post('/register', register);

router.get('/confirmation/:email/:token', verifyAccount);
router.post('/resend', resendLink);
router.post('/login', login('local'));

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/edit', checkLoggedIn, edit);

router.get('/get-current', checkLoggedIn, getCurrentUser);
router.get('/auth/logout', checkLoggedIn, logoutUser);
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email'],
}));

router.get('/auth/google/callback', login('google'));

module.exports = router;