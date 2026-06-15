const Socio = require('./../../src/models/socio.model');

const socioCtrl = {};

socioCtrl.createSocio = async (req, res) => {
    try {
        const socio = await Socio.create(req.body);
        res.status(201).json({ status: 'Socio guardado', data: socio });
    } catch (error) {
        res.status(400).json({ status: 'Error', message: error.message });
    }
};

socioCtrl.getSocios = async (req, res) => {
    try {
        const socios = await Socio.findAll();
        res.json(socios);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los socios.' });
    }
};

socioCtrl.getSociosActivos = async (req, res) => {
    try {
        const socios = await Socio.findAll({ where: { activo: true } });
        res.json(socios);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al recuperar socios activos.' });
    }
};

socioCtrl.deleteSocio = async (req, res) => {
    try {
        // 1. Primero buscamos si el socio existe
        const socio = await Socio.findByPk(req.params.id);

        // 2. Si no existe, devolvemos el error 404
        if (!socio) {
            return res.status(404).json({ 
                status: '0', 
                msg: 'Socio no encontrado' 
            });
        }

        // 3. Si existe, procedemos a destruirlo
        await socio.destroy();

        res.json({ status: '1', msg: 'Socio eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error al eliminar el socio' });
    }
};
socioCtrl.updateSocio = async (req, res) => {
    try {
        const socio = await Socio.findByPk(req.params.id); 
        if (!socio) {
            return res.status(404).json({ status: '0', msg: 'Socio no encontrado' });
        }
        await socio.update(req.body);
        res.json({ status: '1', msg: 'Socio actualizado correctamente', data: socio });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error al actualizar el socio', error: error.message });
    }
};
// ... Aquí luego agregarías delete y put
module.exports = socioCtrl;