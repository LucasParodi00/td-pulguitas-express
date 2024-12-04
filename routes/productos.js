

const express = require('express');
const { setProducto } = require('../controllers/productoController');


const router = express.Router();



router.post('/', setProducto)

module.exports = router;