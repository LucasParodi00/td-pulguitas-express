const {registroController, loginController, cerrarSesionController } = require('../controllers/authController');
const { sequelize } = require('../models');
const responseHelper = require('../utils/helper/responseHelper');

const registroHandler = async (req, res) =>{
    try {
        const transaction = await sequelize.transaction();

        const {nombre, apellido, correo, password} = req.body;

        const registro = await registroController(nombre, apellido, correo, password, transaction);
        await transaction.commit();
        return responseHelper.success(res, 'Registro Exitoso', registro, 200);
    } catch (error) {
        return responseHelper.error(res, 'Error al registrar', error.message,400);
    }
};


const loginHandler = async (req, res) => {
    try {
        const {correo, password} = req.body;
        const login = await loginController(correo, password);
        return responseHelper.success(res, 'Login Exitoso', login, 200);
    } catch (error) {
        return responseHelper.error(res, 'Error al iniciar sesión', error.message, 401);
    }
};

const cerrarSesionHandler = async (req, res) => {
    try {
        await cerrarSesionController();
        res.clearCookie('jwt');
        return responseHelper.success(res, 'Sesión cerrada exitosamente', 200);
    } catch (error) {
        return responseHelper.error(res, 'Error al cerrar sesión', error.message, 401);
    }
    // Implementar logica de cerrar sesión
    return responseHelper.success(res, 'Sesión cerrada', {}, 200);
    
};


module.exports = { registroHandler, loginHandler, cerrarSesionHandler };