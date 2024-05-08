const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post('/request/create', requestController.createRequest);
router.get('/requests', requestController.getAllRequests);
router.put('/requests/:requestId/accept', requestController.acceptRequest);
router.put('/requests/:requestId/reject', requestController.rejectRequest);


module.exports = router;
