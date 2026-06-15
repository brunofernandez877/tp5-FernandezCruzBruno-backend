const Publicacion = require('./../../src/models/publicacion.model');
const Empleado = require('./../../src/models/empleado.model');
const { Op } = require('sequelize'); // Importamos Op para la búsqueda LIKE

const publicacionCtrl = {};

// 1. Dar de alta
publicacionCtrl.createPublicacion = async (req, res) => {
    try {
        const data = req.body;
        // El frontend enviará "empleado" como propiedad (objeto). Extraemos el ID para Sequelize.
        if (data.empleado && data.empleado.id) {
            data.empleadoId = data.empleado.id;
        }
        await Publicacion.create(data);
        res.status(201).json({ status: '1', msg: 'Publicación guardada' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error al guardar', error: error.message });
    }
};

// 2. Obtener todas INCLUYENDO al empleado
publicacionCtrl.getPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.findAll({
            include: [{ model: Empleado }], attributes: { exclude: ['empleadoId'] } // Esto anida la información del empleado automáticamente
        });
        res.json(publicaciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener publicaciones' });
    }
};

// 3. Modificar
publicacionCtrl.updatePublicacion = async (req, res) => {
    try {
        const pub = await Publicacion.findByPk(req.params.id);
        if (!pub) return res.status(404).json({ status: '0', msg: 'No encontrada' });
        
        const data = req.body;
        if (data.empleado && data.empleado.id) {
            data.empleadoId = data.empleado.id;
        }
        
        await pub.update(data);
        res.json({ status: '1', msg: 'Publicación actualizada' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error al actualizar' });
    }
};

// 4. Eliminar
publicacionCtrl.deletePublicacion = async (req, res) => {
    try {
        const pub = await Publicacion.findByPk(req.params.id);
        if (!pub) return res.status(404).json({ status: '0', msg: 'No encontrada' });
        await pub.destroy();
        res.json({ status: '1', msg: 'Publicación eliminada' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error al eliminar' });
    }
};

// 5. Búsqueda combinada (GET con Query Params)
publicacionCtrl.buscarPublicaciones = async (req, res) => {
    try {
        // En un GET, capturamos los filtros usando req.query
        const { titulo, vigente } = req.query;
        
        // ¡IMPORTANTE! Lo que viaja por la URL siempre es un String (texto).
        // Por lo tanto, el frontend nos enviará "true" o "false" como texto.
        // Lo convertimos a booleano real para que Sequelize lo entienda:
        const isVigente = vigente === 'true';
        
        const publicaciones = await Publicacion.findAll({
            where: {
                titulo: { [Op.like]: `%${titulo || ''}%` }, 
                vigente: isVigente
            },
            include: [{ model: Empleado }]
        });
        res.json(publicaciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error en la búsqueda' });
    }
};

module.exports = publicacionCtrl;