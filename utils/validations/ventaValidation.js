const { check, body } = require('express-validator');
const validator = require('../helper/validator');


const setVentaValidation = [
    // Validar que el id_usuario exista y sea un número entero positivo
    check('id_usuario')
        .isInt({ gt: 0 }).withMessage('El usuario debe ser un número entero positivo')
        .notEmpty().withMessage('El usuario es obligatorio'),

    // Validar que productos sea un array no vacío
    check('productos')
        .isArray({ min: 1 }).withMessage('El campo productos debe ser un array no vacío'),

    // Validar cada elemento del array productos
    body('productos.*.id_presentacion')
        .isInt({ gt: 0 }).withMessage('La presentacion debe ser un número entero positivo')
        .notEmpty().withMessage('La presentacion es obligatorio'),

    body('productos.*.cantidad')
        .isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1')
        .notEmpty().withMessage('La cantidad es obligatoria'),

    // Middleware para ejecutar las validaciones
    (req, res, next) => validator(req, res, next)

];

const getVentasValidation = [
    // Validar que el id_usuario exista y sea un número entero positivo
    check('id_usuario')
        .isInt({ gt: 0 }).withMessage('El id_usuario debe ser un número entero positivo')
        .notEmpty().withMessage('El id_usuario es obligatorio'),

    // Middleware para ejecutar las validaciones
    (req, res, next) => validator(req, res, next)
];


module.exports = { setVentaValidation, getVentasValidation };