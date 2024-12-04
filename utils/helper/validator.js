
const { validationResult } = require("express-validator")

const validator = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) { 
        console.log('Error de validacion: ', err);
        res.status(403).send({erros: err.array()});
    }
}


module.exports = validator;