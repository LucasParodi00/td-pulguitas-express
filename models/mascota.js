// models/mascota.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Mascota extends Model {
    static associate(models) {
      this.belongsToMany(models.Producto, { 
        through: 'producto_mascota',
        foreignKey: 'id_mascota',
        otherKey: 'id_producto',
        as: 'productos'
      });
    }
  }

  Mascota.init({
    id_mascota: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }, 
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Mascota',
    tableName: 'mascotas',
    timestamps: false
  });

  return Mascota;
};