const { client, Payment, Preference } = require('../config/mpConfig');
const { Usuario, ProductoPresentacion, Producto, sequelize } = require('../models/');
const base_url = process.env.BASE_MP

const crearOrdenController = async (id_usuario, productos) => {
    try {

        // Validar que productos sea un array (esto deberia estar en las validaciones)
        if (!Array.isArray(productos)) {
            throw new Error('El parámetro "productos" debe ser un array.');
        }
        // Validar que no esté vacío
        if (productos.length === 0) {
            throw new Error('Debe seleccionar al menos un producto.');
        }
    
        //Consultar el usuario x el estado 
        const usuario = await Usuario.findOne({
            where: { id_usuario, estado: true },
            attributes: ['nombre', 'apellido', 'correo']
        });
        if (!usuario) {
            throw new Error('El usuario no está activo.');
        }
        
        let productoEncontrado; 
        let items = [];
        // Consultamos el stock del producto antes de generar la venta 
        for (const producto of productos) {
            
            const { id_presentacion, cantidad } = producto;
            //     productoEncontrado = await ProductoPresentacion.findOne({
            //     where: { id_presentacion },
            //     attributes: ['id_presentacion', 'precio_compra', 'nombre','porcentaje_aumento']
            // });

            productoEncontrado = await ProductoPresentacion.findOne({
                where: { id_presentacion },
                attributes: ['id_presentacion', 'precio_compra', 'nombre','porcentaje_aumento'],
                include: [{
                    model: Producto,
                    as: 'producto',
                    attributes: ['nombre', 'descripcion']
                }],
                
            });

            if (!productoEncontrado || productoEncontrado.stock < cantidad) {
                throw new Error(`No hay stock suficiente para el producto ${id_presentacion}`);
            }

            // Subtotales y calulos: 

            const precio_compra = parseFloat(productoEncontrado.precio_compra);
            const porcentaje_aumento = parseFloat(productoEncontrado.porcentaje_aumento);
            const precio_unitario = parseFloat(precio_compra + (precio_compra * porcentaje_aumento / 100)).toFixed(2);
            // Crear un nuevo array de obejos que contenga los productos re-estructurado segun lo que espera mp
            items.push( 
                {
                    id: productoEncontrado.id_presentacion,
                    title: productoEncontrado.nombre,
                    currency_id: "ARS",
                    description: productoEncontrado.producto.descripcion,
                    quantity: cantidad,
                    unit_price: Number(precio_unitario),
                    // unit_price: Number(parseFloat(productoEncontrado.precio_compra + (productoEncontrado.precio_compra * productoEncontrado.porcentaje_aumento / 100)).toFixed(2))
                }
            ) 
        }
        

        // Crear preferencia en MP
        const preference = new Preference(client);
        
        // Rellenamos la preferencia
        const resultCrearOrden = await preference.create({
            body:{
                items,
                payer: {
                    name: usuario.nombre,
                    surname: usuario.apellido,
                    email: usuario.correo,
                },
                back_urls: { 
                    success: `${base_url}/success`,
                    failure: `${base_url}/failure`,
                    pending: `${base_url}/pending`
                },
                auto_return: 'approved',
                statement_descriptor: 'Pulguitas Pet Shop',
                expires: true,
                notification_url: `${base_url}/webhook`,//web para notificar webhook
                metadata: {
                    id_usuario 
                }
            }
        })
        console.log(resultCrearOrden);
        
        return {init_point: resultCrearOrden.init_point}
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { crearOrdenController }