const { where, Op } = require('sequelize');
const { Usuario, Rol, sequelize } = require('../models/');
const { hashPassword } = require('../security/hashPass');

const crearUsuarioController = async (nombre, apellido, correo, password, transaction) => {
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

const getUsuarioByNombreController = async (nombre) => {
    try {
        const usuario = await Usuario.findOne({ where: { nombre } });
        if (!usuario) throw new Error('El usuario no existe');
        return usuario;
    } catch (error) {
        console.log('Error al obtener el usuario por nombre', error);
        throw new Error('Error al obtener el usuario por nombre');
    }
    
};

const getAllUsuariosController = async () => {
    try {
    const usuarios = Usuario.findAll({
        where: {estado: true},
        attributes: ['id_usuario', 'nombre', 'apellido', 'correo', 'id_rol'],
        include: [{
            model: Rol,
            as: 'rol',
            attributes: ['nombre']
        }],
        order: [['id_usuario', 'ASC']]
    });
    if (!usuarios) throw new Error('El usuario no existe');
    return usuarios;
    } catch (error) {
        console.log('Error al obtener la lista de usuarios', error);
        throw new Error('Error al obtener la lista de usuarios');
        
    }
};

const getUsuarioByIdController = async (id) => {
    try {
        const usuario = await Usuario.findByPk(id, {
            where: {estado: true},
            attributes: ['id_usuario', 'nombre', 'apellido', 'correo', 'id_rol'],
            include: [{
                model: Rol,
                as: 'rol',
                attributes: ['nombre']
            }]
        });
        if (!usuario) throw new Error('El usuario no existe');
        return usuario;
    } catch (error) {
        console.log('Error al obtener el usuario por ID', error);
        throw new Error('Error al obtener el usuario por ID');
    }
};

const updateUsuarioController = async (id, nombre, apellido, correo, password, transaction) => {
    try {
        //verificar que el usuario exista
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw new Error('El usuario no existe');


        // Crear objeto con los campos a actualizar
        const camposActualizar = {};

        // Pregunta si vino nombre para modificar
        if(nombre){
            camposActualizar.nombre = nombre;
        }

        // Pregunta si vino apellido para modificar
        if(apellido){
            camposActualizar.apellido = apellido;
        }

        // Pregunta si vino correo para modificar 
        if(correo){
            const usuarioConCorro = await Usuario.findOne({
                where: {
                    correo,
                    id_usuario: { [Op.ne]: id }
                }
            })
            if(usuarioConCorro){
                throw new Error('El correo ya se encuentra registrado');
            };
        };

        camposActualizar.correo = correo;

        // Pregunta si vino contraseña para modificar
        if(password){
            const hashedPassword = await hashPassword(password);
            camposActualizar.password = hashedPassword;
        }

        // Actualizar solo si hay campos para actualizar
        if(Object.keys(camposActualizar).length > 0){
            await usuario.update(camposActualizar, { 
                where: { id_usuario: id },
                transaction });
        };

        // Obtener y retornar el usuario actualizado

        const usuarioActualizado = await Usuario.findByPk(id, {
            attributes: ['id_usuario', 'nombre', 'apellido', 'correo', 'id_rol'],
            include: [{
                model: Rol,
                as: 'rol',
                attributes: ['nombre']
            }]
        })

        return usuarioActualizado;

    } catch (error) {
        console.log('Error al actualizar el usuario', error);
        if (transaction &&!transaction.finished) { // Evitar rollback en transacción terminada
            await transaction.rollback();
        }
        throw new Error('Error al actualizar el usuario'); 
    }
};

const eliminarUsuarioController = async (id, transaction) => {
    try {
        // Verificar que el usuario exista
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw new Error('El usuario no existe');

        // Eliminar el usuario
        await usuario.update({ estado: false }, { 
            where: { id_usuario: id },
            transaction 
        });

        return usuario;
    } catch (error) {
        console.log('Error al eliminar el usuario', error);
        if (transaction &&!transaction.finished) { // Evitar rollback en transacción terminada
            await transaction.rollback();
        }
        throw new Error('Error al eliminar el usuario'); 
    }
    
};

module.exports = {crearUsuarioController, getUsuarioByNombreController, getAllUsuariosController, getUsuarioByIdController, updateUsuarioController, eliminarUsuarioController};
