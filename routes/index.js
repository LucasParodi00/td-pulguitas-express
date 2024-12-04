
const { log } = require('console');
const express = require('express');
const fs = require('fs');
const router = express.Router();

const PATH_ROUTES = __dirname;
const API_PREFIX = '/api/v1';

const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}

const a = fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file);
    if (name !== 'index') {
        console.log('Cargando ruta: ', name);
        router.use(`${API_PREFIX}/${name}`, require(`./${name}`));
    }
});

module.exports = router;