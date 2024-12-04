
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('venta_detalles', {
      id_venta_detalle: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_venta: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ventas',
          key: 'id_venta',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_producto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'productos',
          key: 'id_producto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      precio_unitario: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sub_total: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('venta_detalles');
  },
};
