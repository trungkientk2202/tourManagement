const express = require('express');
const { test } = require('../app/constrollers/user');
const router = express.Router();

router.get('/test', test);

module.exports = router;