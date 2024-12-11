// migrations/YYYYMMDDHHMMSS-create-usuario.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('imagenes', {
      id_imagen: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_producto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'productos',
          key: 'id_producto'
        }
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('imagenes');
  }
};