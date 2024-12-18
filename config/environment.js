const environment = {
    development: {
        PORT: 3000,
        DATABASE: 'talentos',
        USERNAME: 'root',
        PASSWORD: 'root',
        HOST: "localhost"
    },

    production: {
        PORT: process.env.PORT,
        DATABASE: process.env.DB_NAME,
        USERNAME: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        HOST: process.env.HOST
    }
}

module.exports = environment;

// const enviroment = {
//     development: {
//         PORT: 3000,
//         DATABASE: 'talentos',
//         USERNAME: 'root',
//         PASSWORD: 'root',
//         HOST: "localhost"
//     },

//     production: {
//         PORT: process.env.PORT,
//         DATABASE: process.env.DATABASE,
//         USERNAME: process.env.USERNAME,
//         PASSWORD: process.env.PASSWORD,
//         HOST: process.env.HOST
//     }
// }

// module.exports = enviroment;
