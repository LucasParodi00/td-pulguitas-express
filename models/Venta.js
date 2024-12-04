const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Usuario = require("./Usuario");
const Venta_detalle = require("./Venta_detalle");


module.exports = (sequelize, DataTypes) => {
    const Venta = sequelize.define ('Venta', {
        id_usuario: {type: DataTypes.INTEGER, allowNull: false},
        monto_total: {type: DataTypes.DOUBLE(10,2), allowNull: false},
        fecha: {type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW},
    }, {
        timestamps: false,
        modelName: 'venta'
    });

    Venta.hasMany(sequelize.models.Usuario,{
        foreignKey: 'id_usuario',
        as: 'usuarios'
    });

    Venta.hasOne(sequelize.models.Venta_detalle, {
        foreignKey: 'id_venta',
        as: 'venta_detalles'
    });

    return Venta;
};