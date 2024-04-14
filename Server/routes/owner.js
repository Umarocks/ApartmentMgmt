const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/LoginChecker");
const { IsOwner } = require("../middleware/IsOwner");
const { IsAdminOrOwner} = require("../middleware/IsAdminorOwner");
const OwnerController = require("../controllers/OwnerController");

router.get(
  "/properties",
  ensureAuthenticated,
  IsAdminOrOwner,
  OwnerController.viewProperties
);
router.post(
  "/complaints/respond",
  ensureAuthenticated,
  IsOwner,
  OwnerController.respondToComplaint
);
router.get(
  "/payments",
  ensureAuthenticated,
  IsOwner,
  OwnerController.viewPayments
);

module.exports = router;

// Owner

// Owner can see the Tenant details of his/her owned room.
// Owner can create Tenant.
// Owner can see the complaints from his/her owned room.
// Owner can see the Room Details.
// Owner can see Total Complaint.
// Owner can see Number of Employee.
