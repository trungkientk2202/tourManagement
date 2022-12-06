const express = require('express');
const router = express.Router();
const {httpPlateRecognition} = require('../app/constrollers/recognize');
const { checkLoggedIn } = require('../config/security/auth');

router.post('/plate', checkLoggedIn, httpPlateRecognition);

module.exports = router