const { Op, where } = require("sequelize");
const { sequelize, Mascota, ProductoMascota} = require("../models");
const responseHelper = require("../utils/helper/responseHelper");



const setMascota = async (req, res) => {
    const {nombre, estado} = req.body;

    const transaction = await sequelize.transaction();
    try {
        const nuevaMascota = await Mascota.create({nombre, estado}, {transaction});
        await transaction.commit();
        return responseHelper.success(res, 'Se creo la mascota', nuevaMascota, 201);
    } catch (err) {
        await transaction.rollback();
        return responseHelper.error(res, 'Error al cargar la macota')
    }
}

const getMascotas = async (req, res) => {
    const {nombre, page = 1, limit = 1000} = req.query;
    const offset = (page - 1) * limit;

    const where = nombre ? {nombre: {[Op.like]: `%${nombre}%`}} : {};

    try { 
        const {count, rows: mascotas } = await Mascota.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['id_mascota', 'DESC']]
        });

        return responseHelper.success(
            res,
            'Lista de mascotas',
            {
                mascotas,
                total: count,
                page: parseInt(page)
            }
        );
    } catch (err) {
        responseHelper.error(res, '', err.message)
    }
}

const updateMascota = async (req, res) => {
    const {id} = req.params;
    const {nombre, estado} = req.body;

    const transaction = await sequelize.transaction();
    try {

        const mascota = await Mascota.findOne({
            where: {id_mascota: id},
            transaction
        });

        if (!mascota) {
            throw new Error('No se encontro la mascota');
        }

        const mascotaActualizada = await Mascota.update(
            {nombre, estado},
            {
                where: {id_mascota: id},
                transaction
            }
        );

        await transaction.commit();
        return responseHelper.success(res, 'Mascota Actualizada', mascotaActualizada);
    } catch (err) {
        await transaction.rollback();
        return responseHelper.error(res, '', err.message);
    }
}


const deleteMascota = async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();
    try {
        const productoRelacionado = await ProductoMascota.count({
            where: {id_mascota: id},
            transaction
        });

        if (productoRelacionado > 0) {
            await Mascota.update (
                {estado: false},
                {
                    where: {id_mascota: id},
                    transaction
                }
            )
            await transaction.commit();
            return responseHelper.success(res, 'Se actualizo el estado de la mascota');
        } 

        await Mascota.destroy({
            where: {id_mascota:id}, 
            transaction
        });

        await transaction.commit();
        return responseHelper.success (res, 'Se elimino la mascota');
    } catch (err) {
        await transaction.rollback();
        return responseHelper.error(res, '', err.message);
    }
}


module.exports = {getMascotas, setMascota, deleteMascota, updateMascota}