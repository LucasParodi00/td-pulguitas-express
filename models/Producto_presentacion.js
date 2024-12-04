const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Producto = require("./Producto");



module.exports = (sequelize, DataTypes) => {
    const Producto_presentacion = sequelize.define ('Producto_presentacion', {
        nombre: {type: DataTypes.STRING, allowNull: false},
        precio_compra: {type: DataTypes.DOUBLE(10,2), allowNull: false},
        porcentaje_aumento : {type: DataTypes.DOUBLE(5,2), allowNull: false, defaultValue: 0.0},
        stock: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
        id_producto: {type: DataTypes.INTEGER, allowNull: false}
    }, {
        timestamps: false, 
        modelName: 'producto_presentacion'
    });

    Producto_presentacion.belongTo(sequelize.models.Producto, {
        foreignKey: 'id_producto',
        as: 'productos'
    });

    return Producto_presentacion;
};