// migrations/YYYYMMDDHHMMSS-create-producto-presentacion.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('producto_presentaciones', {
      id_presentacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_producto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'productos',
          key: 'id_producto'
        },
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      precio_compra: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      porcentaje_aumento: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('producto_presentaciones');
  }
};