
 
const { Op } = require('sequelize');
const { Categoria, Producto, sequelize } = require('../models'); 
const responseHelper = require('../utils/helper/responseHelper');

const setCategoria = async (req, res) => {
    const {nombre, estado } = req.body;
    
    const transaction = await sequelize.transaction();

    try {
        const nuevaCategoria = await Categoria.create({nombre, estado}, {transaction});
        await transaction.commit()
        return responseHelper.success(res, 'Se creo la categoria.', nuevaCategoria, 201);
    } catch (err) {
        await transaction.rollback();
        return responseHelper.error(res,' ', err.message);
    }
} 

const getCategorias = async (req, res) => {
    const { nombre, page = 1, limit = 1000 } = req.query;
    const offset = (page - 1) * limit;
    
    const where = nombre ? {nombre:{[Op.like]: `%${nombre}%`}} : {};
   
    try {
        const {count, rows: categorias} = await Categoria.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['id_categoria', 'DESC']]
        });

        return responseHelper.success(res, 'Lista de categorias', {
            categorias,
            total: count,
            page: parseInt(page),
        });
    } catch (err) {
        return responseHelper.error(res, '', err.message);
    }
}

const getCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findByPk(id);
        return responseHelper.success(res, 'Categoria', categoria);
    } catch (err) {
        return responseHelper.error(res, '', err.message);
    }
}

const updateCategoria = async (req, res) => {
    const { id } = req.params;
    const {nombre, estado } = req.body;

    const transaction = await sequelize.transaction();
    try {
        const categoria = await Categoria.findOne({
            where: { id_categoria: id },
             transaction
            });

        if (!categoria) {
            throw new Error ('No se encontro la categoria');
        }

        const categoriaActualizada = await Categoria.update(
            {nombre, estado}, 
            {   
                where: { id_categoria: id },
                transaction 
            });

        await transaction.commit();
        return responseHelper.success (res, 'Categoria Actualizada', categoriaActualizada);
    } catch (err) {
        await transaction.rollback();
        return responseHelper.error(res, 'Error interno', err.message);
    }
}

const deleteCategoria = async (req, res) => {
    const { id } = req.params;

    const transaction = await sequelize.transaction();
    try{

        const productoRelacionado = await Producto.count({
            where: {id_categoria: id},
            transaction
        });

        if (productoRelacionado.length > 0) {
            await Categoria.update(
                {estado: false},
                {
                    where: {id_categoria: id},
                    transaction
                }
            )
            await transaction.commit();
            return responseHelper.success(res, 'Se actualizo el estado de la categoria');
        }

        await Categoria.destroy ({
            where: {id_categoria: id},
            transaction
        });

        await transaction.commit();
        return responseHelper.success(res, 'Se elimino la categoria');
    } catch (err) {
        await transaction.rollback();
        return responseHelper.error(res, 'No se pudo eliminar la categoria', err.message);
    }

}

module.exports = { setCategoria, getCategorias, getCategoria, updateCategoria, deleteCategoria }