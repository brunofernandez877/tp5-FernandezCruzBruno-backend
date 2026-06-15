const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database');
const Empleado = require('./empleado.model');

const Publicacion = sequelize.define('Publicacion', {
    titulo: { type: DataTypes.STRING, allowNull: false },
    contenido: { type: DataTypes.TEXT, allowNull: false },
    imagenAsociada: { type: DataTypes.TEXT, allowNull: true }, // TEXT ideal para base64 largo
    fechaPublicacion: { type: DataTypes.STRING, allowNull: false }, // Gestionar como string según PDF
    vigente: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    tableName: 'publicaciones',
    timestamps: false
});

// Relación Uno a Muchos
//Empleado.hasMany(Publicacion, { foreignKey: 'empleadoId' });
Publicacion.belongsTo(Empleado, { foreignKey: 'empleadoId' });

module.exports = Publicacion;