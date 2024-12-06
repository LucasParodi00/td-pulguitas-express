// migrations/YYYYMMDDHHMMSS-create-producto-mascota.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('producto_mascota', {
      id_mascota: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'mascotas',
          key: 'id_mascota'
        }
      },
      id_producto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'productos',
          key: 'id_producto'
        }
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('producto_mascota');
  }
};