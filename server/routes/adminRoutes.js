const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.post('/logout', adminController.logoutAdmin);
router.get('/admin/:adminId', adminController.getAdminDetail);
router.put('/admin/:adminId', adminController.updateAdminDetail);

router.post('/addUser', adminController.addUser);
router.delete('/user/:userId', adminController.removeUser);
router.put('/user/:userId', adminController.modifyUser);
module.exports = router;
