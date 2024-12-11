


const express = require ('express');
const { getMascotas, setMascota, updateMascota, deleteMascota } = require('../controllers/macotaController');

const router = express.Router();

router.get('/', getMascotas);
router.post('/', setMascota);
router.put('/:id', updateMascota);
router.delete('/:id', deleteMascota);

module.exports = router;