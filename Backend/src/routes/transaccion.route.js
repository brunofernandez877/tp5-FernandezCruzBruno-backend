const express = require('express');
const router = express.Router();
const transCtrl = require('../controllers/transaccion.controller');

router.post('/', transCtrl.createTransaccion);
router.get('/', transCtrl.getTransacciones);

module.exports = router;