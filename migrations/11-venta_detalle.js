// migrations/YYYYMMDDHHMMSS-create-venta-detalle.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('venta_detalles', {
      id_venta_detalle: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_venta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'ventas',
          key: 'id_venta'
        }
      },
      id_presentacion: {
        type: Sequelize.INTEGER,
        references: {
          model: 'producto_presentaciones',
          key: 'id_presentacion'
        },
        allowNull: false
      },
      precio_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sub_total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('venta_detalles');
  }
};