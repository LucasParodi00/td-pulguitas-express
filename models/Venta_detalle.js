// models/venta-detalle.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class VentaDetalle extends Model {
    static associate(models) {
      this.belongsTo(models.Venta, { 
        foreignKey: 'id_venta', 
        as: 'venta' 
      });
      this.hasMany(models.ProductoPresentacion, { 
        foreignKey: 'id_presentacion', 
        as: 'producto' 
      });
    }
  }

  VentaDetalle.init({
    id_venta: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_venta_detalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_presentacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sub_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'VentaDetalle',
    tableName: 'venta_detalles',
    timestamps: false
  });

  return VentaDetalle;
};