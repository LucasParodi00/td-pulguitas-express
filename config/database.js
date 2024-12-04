


const {Sequelize } = require('sequelize');
const enviroment = require('./environment');

const {development} = enviroment;



const sequelize = new Sequelize (
    development.DATABASE, 
    development.USERNAME, 
    development.PASSWORD, 
    {
        host: development.HOST,
        dialect: 'mysql'
    }
)

try {
    await sequelize.authenticate();
    console.log('Conexion establecida');
} catch (error) {
    console.log('No se pudo establecer la conexion. ', error);
    
}