// migrations/YYYYMMDDHHMMSS-create-mascota.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mascotas', {
      id_mascota: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }, 
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: true, 
        defaultValue: true
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mascotas');
  }
};