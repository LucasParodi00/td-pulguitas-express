

const express = require('express');
const { setProducto, getProductos, getProducto, getProductoCompleto, updateProducto } = require('../controllers/productoController');
const { convertImageMiddleware } = require('../middleware/convertImageMiddleware');
const {storageProducto, createMulterUpload} = require ('../config/multer');
const productValidation = require('../utils/validations/productValidation');
const router = express.Router();

const uploadImg = createMulterUpload(storageProducto, {
    limits: {
        files: 10,
        fileSize: 10 * 1024 * 1024
    }
});

router.get('/', getProductos); 
router.get('/completo/:id', getProductoCompleto);
router.get('/:id', getProducto);
router.post('/', uploadImg.array('imagenes', 10), convertImageMiddleware, setProducto);
router.put('/:id', uploadImg.array('imagenes', 10), convertImageMiddleware, productValidation, updateProducto);



module.exports = router;