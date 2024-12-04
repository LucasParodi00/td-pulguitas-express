const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Venta = require("./Venta");



module.exports = (sequelize, DataTypes) => {
    const Venta_detalle = sequelize.define ('Venta_detalle', {
        id_producto: {type: DataTypes.INTEGER, allowNull: false},
        id_venta: {type: DataTypes.INTEGER, allowNull: false},
        precio_unitario: {type: DataTypes.DOUBLE, allowNull: false},
        cantidad: {type: DataTypes.INTEGER, allowNull: false},
        sub_total: {type: DataTypes.DOUBLE, allowNull: false}
    },{
        timestamps: false,
        modelName: 'venta_detalle'
    });

    Venta_detalle.hasOne(sequelize.models.Venta, {
        foreignKey: 'id_venta',
        as: 'ventas'
    });

    return Venta_detalle;
}