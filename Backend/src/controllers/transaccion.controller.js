// backend/src/controllers/transaccion.controller.js
const Transaccion = require('../models/transaccion.model');
const { Op } = require('sequelize'); // Importante para filtros complejos
const transaccionCtrl = {};

// Crear log
transaccionCtrl.createTransaccion = async (req, res) => {
    try {
        await Transaccion.create(req.body);
        res.status(201).json({ status: '1', msg: 'Transacción registrada.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error al registrar.' });
    }
};

// Recuperar TODAS o FILTRAR
transaccionCtrl.getTransacciones = async (req, res) => {
    try {
        let whereClause = {};

        // Filtro por Email (GET /api/transaccion?email=ejemplo@mail.com)
        if (req.query.email) {
            whereClause.emailCliente = req.query.email;
        }

        // Filtro por combinación de idiomas (GET /api/transaccion?origen=es&destino=en)
        if (req.query.origen && req.query.destino) {
            whereClause.idiomaOrigen = req.query.origen;
            whereClause.idiomaDestino = req.query.destino;
        }

        const transacciones = await Transaccion.findAll({ where: whereClause });
        res.json(transacciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al recuperar transacciones.' });
    }
};

module.exports = transaccionCtrl;