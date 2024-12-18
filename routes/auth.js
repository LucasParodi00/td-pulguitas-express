const express = require('express');
const { registroHandler, loginHandler, cerrarSesionHandler} = require('../handlers/authHandler');

const router = express.Router();

router.post("/registro", registroHandler);
router.post("/login", loginHandler);

router.post("/logout", cerrarSesionHandler)

module.exports = router;