const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database'); // Asegúrate de que la ruta apunte a tu archivo
const Agente = sequelize.define('Agente', {
// Sequelize crea un campo 'id' autoincrementable automáticamente, no hace falta ponerlo
legajo: {type: DataTypes.INTEGER, allowNull: false },
apellido: {type: DataTypes.STRING, allowNull: false},
nombre: {type: DataTypes.STRING, allowNull: false},
nro_documento: {type: DataTypes.STRING, allowNull: false},
estado: {type: DataTypes.BOOLEAN, allowNull: false}
}, {
tableName: 'agentes', // Nombre de la tabla en minúsculas y plural
timestamps: true, // Crea automáticamente los campos createdAt y updatedAt
});
module.exports = Agente;