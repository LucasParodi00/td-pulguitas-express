
const express = require('express');
const { getVentasHandler, setVentaHandler } = require('../handlers/ventasHandler');
const { setVentaValidation, getVentasValidation } = require('../utils/validations/ventaValidation');


const router = express.Router();

// Obtener todas las ventas de un usuario
router.get('/', getVentasValidation, getVentasHandler);


// Asi espero recibir los datos del body
//{
//     "id_usuario": 1,
//     "productos": [
//       { "id_presentacion": 5, "cantidad": 2 },
//       { "id_presentacion": 8, "cantidad": 1 }
//     ]
//   }

// Crear un venta
router.post('/', setVentaValidation, setVentaHandler);



module.exports = router;