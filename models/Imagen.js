// models/categoria.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Imagen extends Model {
    static associate(models) {
      this.belongsTo(models.Producto, { 
        foreignKey: 'id_producto', 
        as: 'productos' 
      });
    }
  }

  Imagen.init({
    id_imagen: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_producto: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Producto',
          key: 'id_producto'
        }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Imagen',
    tableName: 'imagenes',
    timestamps: false
  });

  return Imagen;
};