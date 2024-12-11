


const express = require('express');
const router = express.Router();
const path = require('path');


router.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));

module.exports = router