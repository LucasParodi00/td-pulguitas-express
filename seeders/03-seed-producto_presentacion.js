'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('producto_presentaciones', [{
      id_producto: 1,
      nombre: 'Producto 1 presentacion 1',
      precio_compra: 450,
      porcentaje_aumento: 5, 
      stock: 10
    },{
      id_producto: 1,
      nombre: 'Producto 1 presentacion 2',
      precio_compra: 500,
      porcentaje_aumento: 5, 
      stock: 10
    },{
      id_producto: 2,
      nombre: 'Producto 2 presentacion 1',
      precio_compra: 300,
      porcentaje_aumento: 7, 
      stock: 10
    },{
      id_producto: 2,
      nombre: 'Producto 2 presentacion 2',
      precio_compra: 350,
      porcentaje_aumento: 15, 
      stock: 10
    },{
      id_producto: 3,
      nombre: 'Producto 3 presentacion 1',
      precio_compra: 250,
      porcentaje_aumento: 10, 
      stock: 10
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('producto_presentaciones', null, {});
    
  }
};
