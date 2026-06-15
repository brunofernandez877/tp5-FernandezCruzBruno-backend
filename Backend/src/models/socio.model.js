// backend/src/models/socio.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database');

const Socio = sequelize.define('Socio', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    foto: { type: DataTypes.STRING, allowNull: true },
    dni: { type: DataTypes.STRING, allowNull: false, unique: true },
    numeroSocio: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    tableName: 'socios',
    timestamps: true
});

module.exports = Socio;