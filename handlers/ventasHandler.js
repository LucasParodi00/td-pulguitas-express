const { getVentasController, setVentaController } = require("../controllers/ventaController");
const responseHelper = require('../utils/helper/responseHelper');
const { sequelize } = require('../models');

const getVentasHandler = async (req, res) => {
    try {
        // Obtener todas las ventas de 1 usuario :

        // Recibe el id_usuario en el body del request
        const { id_usuario } = req.body;
        
        // Devuelve la lista de ventas y los detalles de cada venta con los productos relacionados
        const ventas = await getVentasController(id_usuario);
        if(!ventas.length){
            return responseHelper.error(res, 'Lista de ventas del usuario esta vacia', 204); 
        }

        return responseHelper.success(res, 'Lista de ventas del usuario', ventas, 200);
    
    } catch (error) {

        return responseHelper.error(res, 'Error al obtener la lista de ventas', error.message); 
    }

};

const setVentaHandler = async (req, res) => {
    const { id_usuario, productos = []} = req.body;
    const transaction = await sequelize.transaction();

    try {
        const venta = await setVentaController(id_usuario, productos, transaction);
        await transaction.commit()
        return responseHelper.success(res, 'Venta creada correctamente', venta, 201);
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return responseHelper.error(res, 'Error al crear la venta.', error.message, 406);
    }
};



module.exports = { getVentasHandler, setVentaHandler };