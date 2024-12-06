// models/producto-mascota.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProductoMascota extends Model {
    static associate(models) {
      this.belongsTo(models.Producto, { 
        foreignKey: 'id_producto', 
        as: 'producto' 
      });
      this.belongsTo(models.Mascota, { 
        foreignKey: 'id_mascota', 
        as: 'mascota' 
      });
    }
  }

  ProductoMascota.init({
    id_mascota: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Mascota',
        key: 'id_mascota'
      }
    },
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Producto',
        key: 'id_producto'
      }
    }
  }, {
    sequelize,
    modelName: 'ProductoMascota',
    tableName: 'producto_mascota',
    timestamps: false
  });

  return ProductoMascota;
};