const { check } = require('express-validator');
const validator  = require ('../helper/validator');

const productValidation = [
    check('nombre').isString().trim().notEmpty().withMessage('El nombre es obligatorio.'),
    check('id_categoria').isInt().toInt().withMessage('La categoría debe ser un número entero.'),
    check('estado').isBoolean().toBoolean().withMessage('El estado debe ser un valor booleano.'),
    check('descripcion').optional().isString().trim().withMessage('La descripción debe ser un texto.'),
    check('presentacion.*.[id_presentacion]')
        .optional({nullable: true})
        .isInt()
        .toInt()
        .withMessage('El id_presentacion debe ser un número entero.'),
    check('presentacion.*[nombre]')
        .isString()
        .trim()
        .withMessage('El nombre de la presentación debe ser texto.'),
    check('presentacion.*[precio_compra]')
        .isFloat({ min: 0 })
        .toFloat()
        .withMessage('El precio de compra debe ser un número mayor o igual a 0.'),
    check('presentacion.*[porcentaje_aumento]')
        .isFloat({ min: 0 })
        .toFloat()
        .withMessage('El porcentaje de aumento debe ser un número mayor o igual a 0.'),
    check('presentacion.*[stock]')
        .isInt({ min: 0 })
        .toInt()
        .withMessage('El stock debe ser un número entero mayor o igual a 0.'),

        (req, res, next) => validator(req, res, next)
];

module.exports = productValidation;
