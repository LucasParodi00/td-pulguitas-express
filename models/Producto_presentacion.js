// models/producto-presentacion.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProductoPresentacion extends Model {
    static associate(models) {
      this.belongsTo(models.Producto, { 
        foreignKey: 'id_producto', 
        as: 'producto' 
      });
      this.belongsTo(models.VentaDetalle, { 
        foreignKey: 'id_presentacion', 
        as: 'presentaciones' 
      });
    } 
  }

  ProductoPresentacion.init({
    id_presentacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio_compra: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    porcentaje_aumento: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'ProductoPresentacion',
    tableName: 'producto_presentaciones',
    timestamps: false
  });

  return ProductoPresentacion;
};