const Sector = require('../models/sector.model');
const Agente = require('../models/agente.model');

const sectorCtrl = {};

sectorCtrl.getSectores = async (req, res) => {
    try {
        const sectores = await Sector.findAll({
            attributes: {
                exclude: ['responsableId'] 
            },
            include: [{
                model: Agente,
                as: 'responsable',
            }]
        
    });
        res.json(sectores);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los sectores.' });
    }
}

sectorCtrl.createSector = async (req, res) => {
    try {
        const data= req.body;
        
        if (data.responsable && data.responsable.id) {
            data.responsableId = data.responsable.id; // Asignar el ID del responsable al campo correspondiente
        }
        await Sector.create(data);
        res.json({ status: '1', msg: 'Sector guardado con responsable.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
}
sectorCtrl.deleteSector = async (req, res) => {
    try {
        await Sector.destroy({
            where: { id: req.params.id }
        });
        res.json({ status: '1', msg: 'Sector removed' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
    }   
}

sectorCtrl.getSector = async (req, res) => {
    try {
        const sector = await Sector.findByPk(req.params.id, 
        { attributes: {
            exclude: ['responsableId'] 
        },
        include: [{
            model: Agente,
            as: 'responsable',
        }]});
        if (sector) {
            res.json(sector);
        } else {
            res.status(404).json({ status: '0', msg: 'Sector no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener el sector.' });
    }
}
sectorCtrl.editSector = async (req, res) => {
    const data = req.body;
    try {
        const sector = await Sector.findByPk(req.params.id);
        if (sector) {
            if (data.responsable && data.responsable.id) {
                data.responsableId = data.responsable.id; 
            }
            await sector.update(data);
            res.json({ status: '1', msg: 'Sector updated' });
        } else {
            res.status(404).json({ status: '0', msg: 'Sector no encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
    }
}

module.exports = sectorCtrl;