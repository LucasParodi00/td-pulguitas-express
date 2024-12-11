// migrations/YYYYMMDDHHMMSS-create-producto.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productos', {
      id_producto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categorias',
          key: 'id_categoria'
        },
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('productos');
  }
};