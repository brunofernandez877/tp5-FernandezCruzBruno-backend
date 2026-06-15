const Transaccion = require('./../../src/models/transaccion.model');
const transaccionCtrl = {};

// 1. Dar de alta una Transaccion (POST)
transaccionCtrl.createTransaccion = async (req, res) => {
    try {
        const transaccion = await Transaccion.create(req.body);
        res.status(201).json({ status: '1', msg: 'Transacción registrada', data: transaccion });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error al guardar', error: error.message });
    }
};

// 2. Recuperar TODAS las Transacciones Registradas (GET)
transaccionCtrl.getTransacciones = async (req, res) => {
    try {
        const transacciones = await Transaccion.findAll();
        res.json(transacciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener transacciones' });
    }
};

// 3. Recuperar histórico de un cliente usando email (GET params)
transaccionCtrl.getTransaccionesByEmail = async (req, res) => {
    try {
        const transacciones = await Transaccion.findAll({
            where: { emailCliente: req.params.email }
        });
        res.json(transacciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al filtrar por email' });
    }
};

// 4. Recuperar transacciones por idiomas de origen y destino (GET params)
transaccionCtrl.getTransaccionesByIdiomas = async (req, res) => {
    try {
        const transacciones = await Transaccion.findAll({
            where: { 
                idiomaOrigen: req.params.origen,
                idiomaDestino: req.params.destino
            }
        });
        res.json(transacciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al filtrar por idiomas' });
    }
};

module.exports = transaccionCtrl;
module.exports = transaccionCtrl;