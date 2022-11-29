const express = require('express');
const { test } = require('../app/constrollers.js/user');
const router = express.Router();

router.get('/test', test);

module.exports = router;