'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('producto_presentaciones', {
      id_presentacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_producto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'productos',
          key: 'id_producto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      precio_compra: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
      },
      porcentaje_aumento: {
        type: Sequelize.DOUBLE(5, 2),
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('producto_presentaciones');
  },
};
