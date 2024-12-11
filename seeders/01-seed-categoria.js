'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('categorias',[{
        nombre: 'categoria A',
        estado: true
      },{
        nombre: 'Categoria B',
        estado: true
      },{
        nombre: 'Categoria C',
        estado: true
      },{
        nombre: 'Categoria D',
        estado: true
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias', null, {});

  }
};
