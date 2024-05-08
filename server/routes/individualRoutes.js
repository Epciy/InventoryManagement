const express = require('express');
const router = express.Router();
const individualController = require('../controllers/individualController');
//const jwtMiddleware = require('../middleware/jwtMiddleware');

router.post('/individual/login', individualController.loginIndividual);
router.get('/individual/:individualId',  individualController.getIndividualDetail);
router.put('/individual/:individualId', individualController.editIndividual);
router.post('/individual/logout',  individualController.logoutIndividual);
router.get('/individuals',individualController.getAllIndividuals);
router.delete('/individuals', individualController.deleteAllIndividuals);
module.exports = router;
