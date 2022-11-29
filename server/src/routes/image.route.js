const express = require('express');
const { uploadImage, uploadImageHandler, getImage } = require('../app/constrollers/image');
const router = express.Router();

router.post('/upload', uploadImage.single('file'), uploadImageHandler);
router.get('/:id', getImage);

module.exports = router;