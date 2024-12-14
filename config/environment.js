




const enviroment = {
    development: {
        PORT: process.env.APP_PORT,
        DATABASE: process.env.DB_NAME,
        USERNAME: process.env.DB_USER,
        PASSWORD: process.env.DB_PASS,
        HOST: process.env.HOST
    },

    production: {
        PORT: process.env.APP_PORT,
        DATABASE: process.env.DB_NAME,
        USERNAME: process.env.DB_USER,
        PASSWORD: process.env.DB_PASS,
        HOST: process.env.HOST
    }
}

module.exports = enviroment;