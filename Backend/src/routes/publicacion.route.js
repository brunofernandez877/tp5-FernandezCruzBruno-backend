const express = require('express');
const router = express.Router();
const publicacionCtrl = require('./../../src/controllers/publicacion.controller');

router.post('/', publicacionCtrl.createPublicacion);
router.get('/', publicacionCtrl.getPublicaciones);
router.put('/:id', publicacionCtrl.updatePublicacion);
router.delete('/:id', publicacionCtrl.deletePublicacion);
router.get('/buscar', publicacionCtrl.buscarPublicaciones);

module.exports = router;