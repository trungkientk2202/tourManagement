const express = require('express');
const passport = require('passport')
const router = express.Router()

const { checkLoggedIn } = require('../config/security/login')
const { test } = require('../app/constrollers/user');

router.get('/test', checkLoggedIn, test);
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email'],
}),(req, res) => {});

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true,
}), (req, res) => {
    console.log('Google call us back!')
});

router.get('/auth/logout', (req, res) => {
    req.logOut()
    return res.redirect('/')
});

module.exports = router;