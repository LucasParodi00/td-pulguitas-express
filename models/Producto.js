const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Producto_presentacion = require("./Producto_presentacion");
const Categoria = require("./Categoria");



module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define ('Producto', {
        id_categoria: {type: DataTypes.INTEGER, allowNull: false},
        nombre: {type: DataTypes.STRING, allowNull: false},
        estado: {type: DataTypes.BOOLEAN, allowNull: false},
        descripcion: {type: DataTypes.STRING, allowNull: false}
    },{
        timestamps: false,
        modelName: 'Producto'
    });

    Producto.belongsTo(sequelize.models.Categoria, {
        foreingKey: 'id_categoria',
        as: 'categorias'
    });

    Producto.hasMany(sequelize.models.Producto_presentacion, {
        foreignKey: 'id_producto'
    });

    return Producto;
};