const { crearUsuarioController, getAllUsuariosController, getUsuarioByNombreController, getUsuarioByIdController, updateUsuarioController, eliminarUsuarioController } = require("../controllers/usuarioController");
const { sequelize } = require("../models");
const responseHelper = require("../utils/helper/responseHelper");

const getAllUsuariosHandler = async (req, res) => {
    try {
        const usuarios = await getAllUsuariosController();
        return responseHelper.success(res, 'Listado de usuarios', usuarios, 200);

    } catch (error) {
        return responseHelper.error(res, 'Error al obtener la lista de usuarios', error.message);
        
    }
};

const getOneUsuarioHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await getUsuarioByIdController(id);
        if (!usuario) {
            return responseHelper.error(res, 'Usuario no encontrado', 404);
        }
        return responseHelper.success(res, 'Usuario encontrado', usuario, 200);
    } catch (error) {
        return responseHelper.error(res, 'Error al obtener el usuario', error.message);
    }
};

const setUsuarioHandler = async (req, res) => {
    try {
        const transaction = await sequelize.transaction();

        const {nombre, apellido, correo, password} = req.body;
        const usuario = await crearUsuarioController(nombre, apellido, correo, password, transaction);
        await transaction.commit()
        return responseHelper.success(res, 'Usuario creado', usuario, 201);
    } catch (error) {
        return responseHelper.error(res, 'Error al crear el usuario', error.message, 400);
    }
};

const editarUsuarioHandler = async (req, res) => {
    try {
        const transaction = await sequelize.transaction();
        const { id } = req.params;
        const { nombre, apellido, correo, password } = req.body;

        const usuario = await updateUsuarioController(id, nombre, apellido, correo, password, transaction);
        if (!usuario) {
            return responseHelper.error(res, 'Usuario no encontrado', 404);
        }
        await transaction.commit()
        return responseHelper.success(res, 'Usuario actualizado', usuario, 200);
    } catch (error) {
        return responseHelper.error(res, 'Error al actualizar el usuario', error.message);
    }
};

const eliminarUsuarioHandler = async (req, res) => {
    try {
        const transaction = await sequelize.transaction();
        const { id } = req.params;
        const usuario = await eliminarUsuarioController(id, transaction);
        if (!usuario) {
            return responseHelper.error(res, 'Usuario no encontrado', 404);
        }
        await transaction.commit()
        return responseHelper.success(res, 'Usuario eliminado', usuario, 200);
    } catch (error) {
        return responseHelper.error(res, 'Error al eliminar el usuario', error.message);
    }
};

module.exports = { getAllUsuariosHandler, getOneUsuarioHandler, setUsuarioHandler, editarUsuarioHandler, eliminarUsuarioHandler };