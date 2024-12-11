// models/producto.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Producto extends Model {
    static associate(models) {
      this.belongsTo(models.Categoria, { 
        foreignKey: 'id_categoria', 
        as: 'categoria' 
      });
      this.hasMany(models.VentaDetalle, { 
        foreignKey: 'id_producto', 
        as: 'ventas_detalle' 
      });
      this.hasMany(models.Imagen, { 
        foreignKey: 'id_producto', 
        as: 'imagenes' 
      });
      this.hasMany(models.ProductoPresentacion, { 
        foreignKey: 'id_producto', 
        as: 'presentaciones' 
      });
      this.belongsToMany(models.Mascota, { 
        through: 'producto_mascota',
        foreignKey: 'id_producto',
        otherKey: 'id_mascota',
        as: 'mascotas'
      });
    }
  }

  Producto.init({
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos',
    timestamps: false
  });

  return Producto;
};