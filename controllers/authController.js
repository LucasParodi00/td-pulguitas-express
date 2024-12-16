const { Usuario, sequelize } = require('../models/');
const { hashPassword, matchPassword } = require('../security/hashPass');
const { generarToken } = require('../security/token');


const registroController = async (nombre, apellido, correo, password, transaction) => {
    try {
        // Validamos que el correo no exista
        const usuarioExiste = await Usuario.findOne({ where: { correo } });
        if (usuarioExiste) throw new Error('El correo ya se encuentra registrado');

        // Encriptar la contraseña
        const hashedPassword = await hashPassword(password);

        // Creamos el usuario
        const nuevoUsuario = await Usuario.create({ 
            nombre,
            apellido,
            correo,
            password: hashedPassword,
            id_rol: 1, //usuario x defecto
            estado: true,
            }, { transaction });

        return nuevoUsuario;
    } catch (error) {
        console.log('Error al registrar el usuario', error);
        if (transaction &&!transaction.finished) { // Evitar rollback en transacción terminada
            await transaction.rollback();
        }
        throw new Error('Error al registrar el usuario');
    }  
};

const loginController = async (correo, password) => {
    try {
    const usuario = await Usuario.findOne({
        where: { correo, estado: true },
        attributes: ['id_usuario', 'nombre', 'apellido', 'correo', 'password', 'id_rol']
    })
    if (!usuario) throw new Error('Correo no encontrado');

    const isPasswordMatch = matchPassword(password, usuario.password);
    if (!isPasswordMatch) throw new Error('Contraseña incorrecta');

    const usuarioToken = await generarToken(usuario);
    const { password: _, ...queSeraEsto } = usuario;
    return { usuario: usuario, token: usuarioToken };

    } catch (error) {
        console.log('Error al iniciar sesión', error);
        throw new Error('Error al iniciar sesión');
    }
};

const cerrarSesionController = async () => {
     try {
          // En JWT no hay una forma directa de "invalidar" el token desde el servidor
          // Simplemente retornamos true para indicar que el proceso fue exitoso
        return true;
     } catch (error) {
        console.log('Error al cerrar sesión', error);
        throw new Error('Error al cerrar sesión');
        }
}
module.exports = { registroController, loginController, cerrarSesionController };