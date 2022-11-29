const express = require('express');
const { test } = require('../app/constrollers.js/user');

const passport = require('passport')
const router = express.Router()



router.get('/test', test);
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email'],
}))
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true,
}), (req, res) => {
    console.log('Google is called us back!')
})
router.get('/auth/logout', (req, res) => {
    req.logOut()
    return res.redirect('/')
})

module.exports = router;