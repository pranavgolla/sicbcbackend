const express = require('express');
const { uploadPhoto } = require('../../controllers/practice/c');
const router = express.Router();
const createUploader=require('../../middleware/practice/m')
// Set up storage and filename

const upload = createUploader('./images/practice'); // You can change this path

router.post('/upload', upload.single('photo'), uploadPhoto);

module.exports = router;
