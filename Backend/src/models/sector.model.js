const {DataTypes} = require('sequelize');
const sequelize = require('./../../config/database');
const Agente = require('./agente.model'); 

const Sector = sequelize.define('Sector', {
    nombre: {type: DataTypes.STRING, allowNull: false},
    funcion: {type: DataTypes.STRING, allowNull: false}
},
{
    tableName: 'sectores' , // Nombre de la tabla en minúsculas y plural
    timestamps: true, // Crea automáticamente los campos createdAt y updatedAt
})

 Sector.belongsTo(Agente, { as: 'responsable'})

module.exports = Sector;