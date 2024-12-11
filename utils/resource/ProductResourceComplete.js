



class ProductResourceComplete  {
    static format(producto) {
        return {
            id: parseInt(producto.id_producto),
            id_categoria: producto.id_categoria,
            nombre: producto.nombre,
            estado: producto.estado,
            descripcion: producto.descripcion,
            presentacion: producto.presentaciones?.map((item)=> ({
                id_presentacion: parseInt(item.id_presentacion),
                nombre_presentacion: item.nombre,
                precio_compra: parseFloat(item.precio_compra),
                porcentaje_aumento: parseFloat(item.porcentaje_aumento),
                stock: parseInt(item.stock)
            })),
            imagenes: producto.imagenes.map((imagen) => ({
                url: imagen.url
            })),
            mascotas: producto.mascotas?.map( (mascota) => ({
                id_mascota: mascota.id_mascota,
                nombre: mascota.nombre || 'No definido'
            }))
        }
    }
}

module.exports = ProductResourceComplete;