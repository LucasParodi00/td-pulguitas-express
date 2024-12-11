// models/rol.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Rol extends Model {
    static associate(models) {
      this.hasMany(models.Usuario, { 
        foreignKey: 'id_rol', 
        as: 'usuarios' 
      });
    }
  }

  Rol.init({
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'roles',
    timestamps: false
  });

  return Rol;
};