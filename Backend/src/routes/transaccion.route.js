const express = require('express');
const router = express.Router();
const transaccionCtrl = require('./../../src/controllers/transaccion.controller');

router.post('/', transaccionCtrl.createTransaccion);
router.get('/', transaccionCtrl.getTransacciones);

// Rutas con PARAMS (Importante el orden, van debajo de la ruta raíz)
router.get('/historial/:email', transaccionCtrl.getTransaccionesByEmail);
router.get('/idiomas/:origen/:destino', transaccionCtrl.getTransaccionesByIdiomas);

module.exports = router;