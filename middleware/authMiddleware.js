const responseHelper = require("../utils/helper/responseHelper");

const authAdmin = (req, res, next) =>{
    const usuario = req.user;

    if(!usuario || usuario.id_role === 1){
        return responseHelper.error(res, 'No tienes permisos para acceder', 403);
    }
    next();
};

module.exports = { authAdmin };