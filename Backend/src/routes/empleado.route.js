const express = require('express');
const router = express.Router();
const empleadoCtrl = require('./../../src/controllers/empleado.controller');

router.post('/', empleadoCtrl.createEmpleado);
router.get('/', empleadoCtrl.getEmpleados);
router.get('/:id', empleadoCtrl.getEmpleado);

module.exports = router;