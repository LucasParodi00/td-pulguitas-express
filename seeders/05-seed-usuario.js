'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('usuarios', [{
      nombre: 'admin',
      apellido: 'admin',
      correo: 'admin@admin.com',
      password: 'admin',
      estado: true,
      id_rol: 2,
    },{
      nombre: 'user',
      apellido: 'user',
      correo: 'user@user.com',
      password: 'user',
      estado: true,
      id_rol: 1,
    }], {});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('usuarios', null, {});
  }
};
