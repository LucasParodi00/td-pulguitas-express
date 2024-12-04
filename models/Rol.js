const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Usuario = require("./Usuario");




module.exports = (sequelize, DataTypes) => {
    const Rol = sequelize.define('Rol', {
        nombre: {type: DataTypes.STRING, allowNull: false}
    },
    {
        timestamps: false,
        modelName: 'rol'
    });

    Rol.hasMany(sequelize.models.Usuario, {
        foreignKey: 'id_rol',
        as: 'usuarios'
    });
    
    return Rol;
};