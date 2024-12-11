
const { Op, where } = require('sequelize');
const { sequelize, Producto, ProductoPresentacion, Imagen, Categoria, Mascota, ProductoMascota, VentaDetalle } = require('../models');
const { generateImageUrl } = require('../utils/helper/generateImgUrl');
// const Imagen = require('../models/Imagen');
const responseHelper = require('../utils/helper/responseHelper');
const fs = require('fs/promises');
const ProductResource = require('../utils/resource/ProductResource');
const ProductResourceComplete = require('../utils/resource/ProductResourceComplete');

const setProducto = async (req, res) => {
    const {nombre, id_categoria, estado, descripcion, presentacion = [] } = req.body;
    const imgFiles = req.files;

    const transaction = await sequelize.transaction();
    try {
        const nuevoProducto = await Producto.create({id_categoria, nombre, estado, descripcion}, {transaction});
        const id_producto = nuevoProducto.id_producto;

        for (const row of presentacion) {
            await ProductoPresentacion.create({...row, id_producto}, {transaction});
        };
        
        await Promise.all(
            imgFiles.map(async (file) => {
                return await Imagen.create({
                    id_producto,
                    url: generateImageUrl(file.path),
                }, {transaction});
            })
        );

        await transaction.commit();
        return responseHelper.success(res, 'Producto creado!', '', 201);
    } catch (err) {
        await transaction.rollback();
        if (imgFiles && imgFiles.length > 0) {
            await Promise.all(
                imgFiles.map(file => 
                    fs.unlink(file.path).catch(error => 
                        console.error(`Error eliminando archivo ${file.path}:`, error)
                    )
                )
            );
        }
        return responseHelper.error(res, 'Error al cargar el producto. ');
    }
}
const getProductos = async (req, res) => {
    const { nombre, page = 1, limit = 1000, categoria = '', mascota = '' } = req.query;

    try {
        const { count, rows: productos } = await Producto.findAndCountAll({
            include: [
                {
                    model: ProductoPresentacion,
                    as: 'presentaciones'
                },
                {
                    model: Imagen,
                    as: 'imagenes'
                },
                {
                    model: Categoria,
                    as: 'categoria'
                },
                {
                    model: Mascota,
                    as: 'mascotas',
                    through: { model: ProductoMascota }
                }
            ],
            where: {
                ...(nombre && { nombre: { [Op.like]: `%${nombre}%` } }),
                ...(categoria && { '$categoria.nombre$': { [Op.like]: `%${categoria}%` } }),
                ...(mascota && { '$mascotas.nombre$': { [Op.like]: `%${mascota}%` } }),
            },
            distinct: true,
            col: 'id_producto',
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['id_producto', 'DESC']],
            logging: console.log,
        });

        return responseHelper.success(res, 'Lista de productos.', {
            productos,
            total: count,
            page: parseInt(page),
        });
    } catch (err) {
        return responseHelper.error(res, 'Error al listar los productos', err.message);
    }
};

const getProductoBase = async (id) => {
        return await Producto.findByPk(id, {
            include: [
                {
                    model: ProductoPresentacion,
                    as: 'presentaciones',
                },
                {
                    model: Imagen,
                    as: 'imagenes'
                },
                {
                    model: Categoria,
                    as: 'categoria'
                },
                {
                    model: Mascota,
                    as: 'mascotas',
                    through: { model: ProductoMascota }
                }
            ]
        });
}

const getProducto = async (req, res) => {
    const { id } = req.params;
    try{
        const producto = await getProductoBase (id);
        return responseHelper.success(res, `Producto ${id}`, ProductResource.format(producto));
    } catch (err) {
        return responseHelper.error(res, 'Error al obtener el producto!', err.message);
    }
}

const getProductoCompleto = async (req, res) => {
    const { id } = req.params;
    try{
        const producto = await getProductoBase (id);
        return responseHelper.success(res, `Producto ${id}`, ProductResourceComplete.format(producto));
    } catch (err) {
        return responseHelper.error(res, 'Error al obtener el producto!', err.message);
    }
}

// const updateProducto = async (req, res) => {
//     const {id} = req.params;
//     const {nombre, id_categoria, estado, descripcion, presentacion = [] } = req.body;
//     const imgFiles = req.files;

//     const transaction = await sequelize.transaction();

//     try { 
//         const productoExistente = await Producto.findByPk(id, {
//             include: [
//                 {
//                     model: ProductoPresentacion,
//                     as: 'presentaciones'
//                 }
//             ]
//         });

//         if (!productoExistente){
//             return responseHelper.error('Producto no encontrado');
//         }

//         await productoExistente.update({nombre, id_categoria, estado, descripcion}, {transaction});

//         const presentacionesActuales = await ProductoPresentacion.findAll({
//             where: {id_producto: id}
//         });

//         const presentacionesAEliminar = presentacionesActuales.filter(
//             actual => !presentacion.some(nuevo=> nuevo.id_presentacion === actual.id_presentacion)
//         );

//         for (const presentacionAEliminar of presentacionesAEliminar){
//             const ventaDetalleCount = await VentaDetalle.count({
//                 where: {id_presentacion : presentacionAEliminar.id_presentacion}
//             });

//             if (ventaDetalleCount > 0) {
//                 await ProductoPresentacion.update( { estado: false }, { where: {id_presentacion : presentacionAEliminar.id_presentacion}, transaction});
//             } else {
//                 await ProductoPresentacion.destroy({
//                     where: {
//                         id_presentacion : presentacionAEliminar.id_presentacion
//                     }, 
//                     transaction
//                 })
//             }
//         }

//         for (const row of presentacion) {
//             if (row.id_presentacion) {
//                 await ProductoPresentacion.update(row, {
//                     where: { id_presentacion: row.id_presentacion },
//                     transaction
//                 });
//             } else {
//                 await ProductoPresentacion.create({
//                     ...row, 
//                     id 
//                 }, { transaction });
//             }
//         }

//         if (imgFiles && imgFiles.length > 0) {
//             const imagenesAnteriores = await Imagen.findAll({
//                 where: { id }
//             });

//             await Promise.all(
//                 imagenesAnteriores.map(imagen => 
//                     fs.unlink(imagen.url.replace(process.env.BASE_URL, 'public')).catch(error => 
//                         console.error(`Error eliminando archivo ${imagen.url}:`, error)
//                     )
//                 )
//             );

//             await Imagen.destroy({
//                 where: { id },
//                 transaction
//             });

//             await Promise.all(
//                 imgFiles.map(async (file) => {
//                     return await Imagen.create({
//                         id,
//                         url: generateImageUrl(file.path),
//                     }, { transaction });
//                 })
//             );
//         }

//         await transaction.commit();
//         return responseHelper.success (res, 'Producto actualizado!');
//     } catch (err) {
//         await transaction.rollback();
//         return responseHelper.error(res, 'Error al actualizar el producto!', err.message);
//     }
    
    

// }

const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, id_categoria, estado, descripcion, presentacion = [] } = req.body;
    const imgFiles = req.files;

    const transaction = await sequelize.transaction();

    try {
        const productoExistente = await Producto.findByPk(id, {
            include: [{ model: ProductoPresentacion, as: 'presentaciones' }],
        });

        if (!productoExistente) {
            return responseHelper.error(res, 'Producto no encontrado');
        }

        await productoExistente.update({ nombre, id_categoria, estado, descripcion }, { transaction });

        const presentacionesActuales = await ProductoPresentacion.findAll({
            where: { id_producto: id },
        });

        const presentacionesAEliminar = presentacionesActuales.filter(
            (actual) => !presentacion.some((nuevo) => Number(nuevo.id_presentacion) === Number(actual.id_presentacion))
        );
              
        for (const presentacionAEliminar of presentacionesAEliminar) {
            const ventaDetalleCount = await VentaDetalle.count({
                where: { id_presentacion: presentacionAEliminar.id_presentacion },
            });

            if (ventaDetalleCount > 0) {
                await ProductoPresentacion.update(
                    { estado: false },
                    { where: { id_presentacion: presentacionAEliminar.id_presentacion }, transaction }
                );
            } else {
                await ProductoPresentacion.destroy({
                    where: { id_presentacion: presentacionAEliminar.id_presentacion },
                    transaction,
                });
            }
        }

        for (const row of presentacion) {
            if (row.id_presentacion) {
                await ProductoPresentacion.update(row, {
                    where: { id_presentacion: row.id_presentacion },
                    transaction,
                });
            } else {
                await ProductoPresentacion.create({ ...row, id_producto: id }, { transaction });
            }
        }

        if (imgFiles && imgFiles.length > 0) {
            const imagenesAnteriores = await Imagen.findAll({ where: { id_producto: id } });

            for (const imagen of imagenesAnteriores) {
                try {
                    const filePath = imagen.url.replace(process.env.BASE_URL, 'public');
                    if (fs.existsSync(filePath)) {
                        await fs.unlink(filePath);
                    }
                } catch (error) {
                    console.error(`Error eliminando archivo ${imagen.url}:`, error);
                }
            }

            await Imagen.destroy({ where: { id_producto: id }, transaction });

            for (const file of imgFiles) {
                await Imagen.create(
                    { id_producto: id, url: generateImageUrl(file.path) },
                    { transaction }
                );
            }
        }

        await transaction.commit();
        return responseHelper.success(res, 'Producto actualizado!');
    } catch (err) {
        await transaction.rollback();
        console.error('Error al actualizar el producto:', err);
        return responseHelper.error(res, 'Error al actualizar el producto!', err.message);
    }
};

module.exports = { setProducto, getProductos, getProducto, getProductoCompleto, updateProducto};