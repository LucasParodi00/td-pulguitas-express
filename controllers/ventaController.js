
const { where } = require('sequelize');
const { Producto, Categoria, Usuario, Venta, ProductoPresentacion, VentaDetalle, sequelize } = require('../models/');

const getVentasController = async (id_usuario) => {
    try {
        const ventas = await Venta.findAll({
            where:{ id_usuario: id_usuario},
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['nombre', 'apellido','correo']
                },
                {
                    model: VentaDetalle,
                    as: 'detalles',
                    include: [ // esto se puede comentar
                        {
                            model: ProductoPresentacion, // Incluye el producto
                            as: 'producto',
                            attributes: ['nombre', 'precio_compra'],
                            include: [{
                                model: Producto, // Incluye la categoria
                                as: 'producto',
                                attributes: ['nombre'],
                                include: [{
                                    model: Categoria,
                                    as: 'categoria',
                                    attributes: ['nombre'],
                                }]
                            }]
                            
                        },
                    ],
                },
                
            ],
            order: [['fecha', 'DESC']], // Orden por fecha descendente
        });
        return ventas;
    } catch (error) {
        console.log('Error al obtener las ventas', error);
        throw new Error('Error al obtener las ventas'); 
    }
}

const setVentaController = async (id_usuario, productos, transaction) => {
    try {
        // Validamos que el usuario exista y este activo 
        const usuario = await Usuario.findOne({ where: {id_usuario, estado: true}, transaction})
        if (!usuario) {
            throw new Error('El usuario no existe o no está activo');
        }
        
        let monto_total = 0;
        let ventaDetalle = [];

        for (const producto of productos){
            const { id_presentacion, cantidad } = producto;
            const productoEncontrado = await ProductoPresentacion.findOne({ 
                where: {
                    id_presentacion: id_presentacion,
                },
                transaction
            }); //Validamos el stock del producto
            if (!productoEncontrado || productoEncontrado.stock < cantidad) throw new Error('Stock insuficiente');

            // Subtotales y calculos:

            const precio_compra = parseFloat(productoEncontrado.precio_compra);
            const porcentaje_aumento = parseFloat(productoEncontrado.porcentaje_aumento);
            
            const precio_unitario = precio_compra + (precio_compra * porcentaje_aumento / 100);
            const sub_total = precio_unitario * cantidad;
            
            monto_total = monto_total + sub_total;

            // Agregamos el detalle a temporalmente:
            ventaDetalle.push({
                id_presentacion,
                precio_unitario,
                cantidad,
                sub_total,
            })
            
            // Actualizar el stock del producto
            const nuevoStock = productoEncontrado.stock - cantidad;
            const [stockActualizado] = await ProductoPresentacion.update({ 
                stock: nuevoStock
            },
            { 
                where: { id_presentacion: id_presentacion },
                transaction 
            });
            if (!stockActualizado) throw new Error('No se pudo actualizar el stock del producto');
        } //Fin del for
    
        // Crear la venta
        const nuevaVenta = await Venta.create({
            id_usuario: usuario.id_usuario,
            monto_total: monto_total,
            fecha: new Date()
        },{ transaction });

        //Crear el detalle de la venta 
        for (const detalle of ventaDetalle){
            await VentaDetalle.create({
                id_venta: nuevaVenta.id_venta,
                id_presentacion: detalle.id_presentacion,
                precio_unitario: detalle.precio_unitario,
                cantidad: detalle.cantidad,
                sub_total: detalle.sub_total,
               
            },{ transaction });
        }
        return nuevaVenta; //esto se puede modificar a necesidad
    } catch (error) {
        console.log('Error al crear la venta', error);
        if (transaction && !transaction.finished) { // Evitar rollback en transacción terminada
            await transaction.rollback();
        }
        throw new Error('Error al crear la venta');
    }
}


module.exports = { getVentasController, setVentaController }