



const express = require('express');
const { setCategoria, getCategorias, getCategoria, updateCategoria, deleteCategoria } = require('../controllers/categoriaController');
const categoryValidation = require('../utils/validations/categoryValidation');
const router = express.Router();


router.get('/:id', getCategoria);
router.get('/', getCategorias )
router.post ('/', categoryValidation,  setCategoria);
router.put('/:id', categoryValidation,  updateCategoria);
router.delete('/:id', deleteCategoria);


module.exports = router;