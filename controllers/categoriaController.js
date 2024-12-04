const Categoria = require("../models");




const setCategoria = async (req, res) => {
    const {nombre, estado } = req.body;
    
    try {
        const nuevaCategoria = new Categoria.create({nombre, estado});
        return res.status(201).json({mensaje: 'Se creo la categoria', data: nuevaCategoria})
    } catch (err) {
        return res.status(500).json({mensaje: 'Error interno', detalles: err.message})
    }
}


module.exports = { setCategoria }