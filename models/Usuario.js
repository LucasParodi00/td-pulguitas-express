const Rol = require("./Rol");


module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nombre: {type: DataTypes.STRING, allowNull: false},
        apellido: {type: DataTypes.STRING, allowNull: false},
        correo: {type: DataTypes.STRING, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        id_rol: {type: DataTypes.INTEGER, allowNull: false}
    }, 
    {
        timestamps: false,
        modelName: 'usuario'
    });

    Usuario.belongsTo(sequelize.models.Rol, {
        foreignKey: 'id_rol',
        as: 'rol',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    });

    return Usuario;
};
