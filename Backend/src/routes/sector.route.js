const express = require('express');
const router = express.Router();
const sectorCtrl = require('./../../src/controllers/sector.controller');

router.get('/', sectorCtrl.getSectores);
router.post('/', sectorCtrl.createSector);
router.delete('/:id', sectorCtrl.deleteSector);
router.get('/:id', sectorCtrl.getSector);
router.put('/:id', sectorCtrl.editSector);
module.exports = router;