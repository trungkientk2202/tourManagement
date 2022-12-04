const express = require('express');
const passport = require('passport')
const router = express.Router()

const { checkLoggedIn } = require('../config/security/login')
const { test, httpGetUser } = require('../app/constrollers/user');

router.get('/test', checkLoggedIn, test);
router.get('/get', checkLoggedIn, httpGetUser)
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email'],
}),(req, res) => {
    console.log('Google is called us back!')
});

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: 'http://localhost:3000',
    session: true,
}), (req, res) => {
    console.log('Login success!')
});

router.get('/auth/logout', (req, res) => {
    req.logOut()
    return res.redirect('/')
});

module.exports = router;