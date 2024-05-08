const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');


router.post('/organization/login', organizationController.loginOrganization);
router.get('/organization/:organizationId',  organizationController.getOrganizationDetail);
router.put('/organization/:organizationId',  organizationController.editOrganization);
router.post('/organization/logout', organizationController.logoutOrganization);
router.get('/organizations',organizationController.getAllOrganizations);
router.delete('/organizations',organizationController.deleteAllOrganizations);

module.exports = router;
