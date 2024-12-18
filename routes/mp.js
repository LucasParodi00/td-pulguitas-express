const express = require('express');
const router = express.Router();
// Pendiente : 
//  middlerWare de webtoken 
//  Validaciones de la orden
const { crearOrdenHandler, webhookHandler, ventaOkHandler} = require('../handlers/mercadoPagoHandler');


router.post('/carrito', crearOrdenHandler);

router.post('/success', ventaOkHandler);


module.exports = router;