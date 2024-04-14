const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/LoginChecker');
const IsOwner = require('../middleware/IsOwner');

const OwnerController = require('../controllers/OwnerController');


router.get('/properties', ensureAuthenticated, IsOwner, OwnerController.viewProperties);
router.post('/complaints/respond', ensureAuthenticated, IsOwner, OwnerController.respondToComplaint);
router.get('/payments', ensureAuthenticated, IsOwner, OwnerController.viewPayments);


module.exports = router;