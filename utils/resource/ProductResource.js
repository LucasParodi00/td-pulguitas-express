
class ProductResource {
    static format(producto) {
        return {
            id: parseInt(producto.id_producto),
            categoria: producto.categoria.nombre,
            nombre: producto.nombre,
            estado: producto.estado,
            descripcion: producto.descripcion,
            presentaciones: producto.presentaciones?.map((item)=> ({
                id_presentacion: parseInt(item.id_presentacion),
                nombre: item.nombre,
                precio_compra: parseFloat(item.precio_compra),
                porcentaje_aumento: parseFloat(item.porcentaje_aumento),
                stock: parseInt(item.stock)
            })),
            imagenes: producto.imagenes.map((imagen) => ({
                url: imagen.url
            })),
            mascotas: producto.mascotas?.map( (mascota) => ({
                nombre: mascota.nombre || 'No definido'
            }))
        }
    }
}

module.exports = ProductResource;