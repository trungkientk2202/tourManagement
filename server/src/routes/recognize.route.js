const express = require('express');
const router = express.Router();
const {httpPlateRecognition} = require('../app/constrollers/recognize');

router.get('/plate', httpPlateRecognition);

module.exports = router