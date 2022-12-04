const express = require('express');
const { uploadImage, uploadImageHandler, getImage } = require('../app/constrollers/image');
const { checkLoggedIn } = require('../config/security/auth');
const router = express.Router();

router.post('/upload',checkLoggedIn, uploadImage.single('file'), uploadImageHandler);
router.get('/:id',checkLoggedIn, getImage);

module.exports = router;