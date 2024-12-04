const Producto = require("./Producto");

module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
        nombre: { type: DataTypes.STRING, allowNull: false },
        estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    }, {
        timestamps: false,
        modelName: 'Categoria'
    });

    Categoria.hasMany(sequelize.models.Producto, {
        foreignKey: 'id_categoria',
        as: 'categoria',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    });
    return Categoria;
};
