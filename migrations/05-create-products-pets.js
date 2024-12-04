'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('producto_mascotas', {
      id_producto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'productos',
          key: 'id_producto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      id_mascota: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mascotas',
          key: 'id_mascota',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('producto_mascotas');
  },
};
