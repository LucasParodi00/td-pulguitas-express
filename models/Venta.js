// models/venta.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Venta extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, { 
        foreignKey: 'id_usuario', 
        as: 'usuario' 
      });
      this.hasMany(models.VentaDetalle, { 
        foreignKey: 'id_venta', 
        as: 'detalles' 
      });
    }
  }

  Venta.init({
    id_venta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monto_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Venta',
    tableName: 'ventas',
    timestamps: false
  });

  return Venta;
};