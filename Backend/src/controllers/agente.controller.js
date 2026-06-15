const Agente = require('../models/agente.model'); // Asegúrate de usar la ruta correcta a tu modelo
const agenteCtrl = {};
// Obtener todos los agentes
agenteCtrl.getAgentes = async (req, res) => {
try {
const agentes = await Agente.findAll();
res.json(agentes);
} catch (error) {
res.status(500).json({ status: '0', msg: 'Error al obtener los agentes.' });
}
};
// Crear un nuevo agente
agenteCtrl.createAgente = async (req, res) => {
try {
// Sequelize usa .create() para instanciar y guardar en un solo paso
await Agente.create(req.body);
res.json({ status: '1', msg: 'Agente guardado.' });
} catch (error) {
res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
}
};
// Obtener un agente por ID
agenteCtrl.getAgente = async (req, res) => {
try {
// Buscamos por la clave primaria (id numérico)
const agente = await Agente.findByPk(req.params.id);
if (!agente) {
return res.status(404).json({ status: '0', msg: 'Agente no encontrado.' });
}
res.json(agente);
} catch (error) {
res.status(500).json({ status: '0', msg: 'Error al obtener el agente.' });
}
};
// Editar un agente
agenteCtrl.editAgente = async (req, res) => {
try {
await Agente.update(req.body, {
where: { id: req.body.id }
});
res.json({ status: '1', msg: 'Agente updated' });
} catch (error) {
res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
}
};
// Eliminar un agente
agenteCtrl.deleteAgente = async (req, res) => {
try {
// .destroy() elimina el registro que coincida con el ID enviado por parámetro
await Agente.destroy({
where: { id: req.params.id }
});
res.json({ status: '1', msg: 'Agente removed' });
} catch (error) {
res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
}
};
module.exports = agenteCtrl;