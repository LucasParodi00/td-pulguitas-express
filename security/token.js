const jwt = require('jsonwebtoken');

async function generarToken(usuario) {
    const llaveSecreta = process.env.SECRET_KEY
    const payload = {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        id_rol: usuario.id_rol
    };

    try {
        const token = jwt.sign(payload, llaveSecreta, {expiresIn: '1h'})
        return token;
    } catch (error) {
        throw new Error('no se pudo generar el token');
    }
}

async function verificarToken(token) {
    const llaveSecreta = process.env.SECRET_KEY
    try {
        const decoded = jwt.verify(token,llaveSecreta);
        return decoded;
    } catch (error) {
        throw new Error('Token invalido');
    }
}

module.exports = { generarToken, verificarToken };