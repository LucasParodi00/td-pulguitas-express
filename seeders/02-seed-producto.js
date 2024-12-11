// pnpm sequelize db:seed (nombre del seed)
// pnpm sequelize db:seed:all 
// pnpm sequelize db:seed:undo:all 
// pnpm sequelize seed:generate --name seed-producto

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('productos', [{
        id_categoria: 1,
        nombre: 'Producto 1',
        descripcion: 'Descrip 1',
        estado: true
      },{
        id_categoria: 2,
        nombre: 'Producto 2',
        descripcion: 'Descrip 2',
        estado: true
      },{
        id_categoria: 3,
        nombre: 'Producto 3',
        descripcion: 'Descrip 3',
        estado: true
      },{
        id_categoria: 4,
        nombre: 'Producto 4',
        descripcion: 'Descrip 4',
        estado: true
      }],{});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('productos', null, {});
    
  }
};
