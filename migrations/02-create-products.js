'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productos', {
      id_producto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categorias',
          key: 'id_categoria',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productos');
  },
};
