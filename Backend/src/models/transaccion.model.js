const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database');

const Transaccion = sequelize.define('Transaccion', {
    idiomaOrigen: { type: DataTypes.STRING, allowNull: false },
    textoOrigen: { type: DataTypes.STRING, allowNull: false }, // Corregido de number a STRING
    idiomaDestino: { type: DataTypes.STRING, allowNull: false },
    textoDestino: { type: DataTypes.STRING, allowNull: false }, // Corregido de number a STRING
    emailCliente: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'transacciones',
    timestamps: true // Ideal para un LOG, así sabemos cuándo se hizo cada transacción
});

module.exports = Transaccion;