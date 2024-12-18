
const { Sequelize } = require('sequelize');

const { development } = require ('./environment');
const config = development;

const PORT = config.PORT;
const DATABASE = config.DATABASE;
const USERNAME = config.USERNAME;
const PASSWORD = config.PASSWORD;
const HOST = config.HOST;

const sequelize = new Sequelize(
  DATABASE,
  USERNAME,
  PASSWORD,
  {
    dialect: 'mysql',
    host: HOST,
    port: PORT,
    logging: console.log()
  }
);

(async () => {
  try {
    console.log('Autenticando conexión...');
    await sequelize.authenticate();
    console.log('Conexión establecida exitosamente.');
  } catch (error) {
    console.log('No se pudo establecer la conexión: ', error);
  }
})();
