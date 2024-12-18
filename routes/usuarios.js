const express = require('express');

const {getAllUsuariosHandler, getOneUsuarioHandler, setUsuarioHandler, editarUsuarioHandler, eliminarUsuarioHandler } = require('../handlers/usuarioHandler');
const { verificarTokenMiddlerware } = require('../middleware/verificadorTokenMiddlerware');
const { authAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verificarTokenMiddlerware, authAdmin, getAllUsuariosHandler);

router.get('/:id', verificarTokenMiddlerware, authAdmin, getOneUsuarioHandler);

router.post('/', verificarTokenMiddlerware, authAdmin, setUsuarioHandler);

router.put('/:id', verificarTokenMiddlerware, authAdmin, editarUsuarioHandler);

router.delete('/:id', verificarTokenMiddlerware, authAdmin, eliminarUsuarioHandler);


module.exports = router;