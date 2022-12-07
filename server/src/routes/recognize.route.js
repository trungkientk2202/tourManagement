const express = require('express');
const router = express.Router();
const {httpPlateRecognition} = require('../app/constrollers/recognize');
const { uploadImage } = require('../app/constrollers/image');
const { checkLoggedIn } = require('../config/security/auth');

router.post('/plate', checkLoggedIn, uploadImage.single('file'), httpPlateRecognition);

module.exports = router