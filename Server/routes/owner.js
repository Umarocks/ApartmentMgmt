const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/LoginChecker");
const { IsOwner } = require("../middleware/IsOwner");
const { IsAdminOrOwner } = require("../middleware/IsAdminorOwner");
const OwnerController = require("../controllers/OwnerController");
const { adminController } = require("../controllers/adminController");
router.get(
  "/viewproperties",
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

router.post(
  "/createTenant",
  ensureAuthenticated,
  IsOwner,
  adminController.createTenant
);

router.get(
  "/getAllComplaint",
  ensureAuthenticated,
  IsOwner,
  adminController.getAllComplaints
);
module.exports = router;

// Owner

// Owner can see the Tenant details of his/her owned room.{Done}
// Owner can create Tenant. {Done}
// Owner can see the complaints from his/her owned room.{Done}
// Owner can see the Room Details.{Done}
// Owner can see Total Complaint.{Done}
