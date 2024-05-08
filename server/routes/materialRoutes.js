
const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
//const jwtMiddleware = require('../middleware/jwtMiddleware');

router.post('/material/addMaterial', materialController.addMaterial);
router.delete('/material/delete/:materialId', materialController.deleteMaterial);
router.put('/material/edit/:materialId', materialController.editMaterial);
router.delete('/material/deleteAll', materialController.deleteAllMaterials);
router.get('/material/:materialId', materialController.getMaterialDetail);
router.get('/materials', materialController.getAllMaterials);
module.exports = router;
