



const express = require('express');
const { setCategoria } = require('../controllers/categoriaController');
const categoryValidation = require('../utils/validations/categoryValidation');
const router = express.Router();


router.post ('/', categoryValidation,  setCategoria);

module.exports = router;