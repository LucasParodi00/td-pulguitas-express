const { sequelize } = require('../models');
const responseHelper = require('../utils/helper/responseHelper');
const { crearOrdenController } = require('../controllers/mercadoPagoController');
const { setVentaController } = require('../controllers/ventaController');

const crearOrdenHandler = async (req, res) => {
    // Implementación del código para mandar los datos de una orden al controllermercadoPago
    try {
        // Recibo los datos del front-carrito
        const {id_usuario, productos = []} = req.body;

        // Llama al controller de mercadoPago para crear la orden
        const orden = await crearOrdenController(id_usuario, productos);

        // Mando la respuesta al front-carrito
        return responseHelper.success(res, 'Orden creada correctamente', orden, 201);
        
    } catch (error) {
        // En caso de error, devuelvo el error al front-carrito
        return responseHelper.error(res, 'Error al crear la orden', error.message, 406);
        
    }
};

const ventaOkHandler = async (req, res) => {
    try {
        const {collector_id, operation_type, items, additional_info, client_id} = req.body;
        console.log({
            items,
            additional_info,
            client_id
        });

        const ventaOk = await setVentaController(client_id, items);
        responseHelper.success(res, 'Venta Finalizada', ventaOk);
    } catch (error) {
        console.error(error); 
    }

}

module.exports = { crearOrdenHandler, ventaOkHandler };