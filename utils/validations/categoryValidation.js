const { check } = require("express-validator");
const validator = require ('../helper/validator');


const categoryValidation = [
    check('nombre').isLength({min:3, max:100}).notEmpty().withMessage('El nombre de la categoria es obligatio entre 3 y 100 caracteres'),
    check('estado').isBoolean().withMessage('El estado debe ser un valor booleaneo'),

    (req, res, next) => validator(req, res, next)
];


module.exports = categoryValidation;