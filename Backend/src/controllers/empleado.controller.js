const Empleado = require('./../../src/models/empleado.model');
const empleadoCtrl = {};

empleadoCtrl.createEmpleado = async (req, res) => {
    try {
        await Empleado.create(req.body);
        res.status(201).json({ status: '1', msg: 'Empleado guardado' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error al guardar empleado', error: error.message });
    }
};

empleadoCtrl.getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.findAll();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener empleados' });
    }
};

empleadoCtrl.getEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.findByPk(req.params.id);
        if (!empleado) return res.status(404).json({ status: '0', msg: 'No encontrado' });
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener empleado' });
    }
};

module.exports = empleadoCtrl;