
const { verificarToken } = require('../security/token');
const responseHelper = require('../utils/helper/responseHelper');

const verificarTokenMiddlerware = async (req, res, next) => {
    try {
        const tokenAutorizado = req.header('Authorization');
        if (!tokenAutorizado) {
            return responseHelper.error(res, 'Token no encontrado', 401);
        }
        const token = tokenAutorizado.split(' ')[1];
        if (!token) {
            return responseHelper.error(res, 'Token invalido', 403);
        }

        const tokenValidado = await verificarToken(token);
        req.user = tokenValidado;
        next();
    } catch (error) {
        return responseHelper.error(res, 'Token invalido', 403);
    }
}

module.exports = { verificarTokenMiddlerware };
