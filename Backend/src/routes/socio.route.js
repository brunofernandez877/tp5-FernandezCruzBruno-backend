
const express = require('express');
const router = express.Router();
const socioCtrl = require('./../../src/controllers/socio.controller');

router.post('/', socioCtrl.createSocio);
router.get('/', socioCtrl.getSocios);
router.get('/activos', socioCtrl.getSociosActivos); // Si quieres traer todos sin filtro, puedes usar esta ruta
router.delete('/:id', socioCtrl.deleteSocio);
router.put('/:id', socioCtrl.updateSocio);

module.exports = router;