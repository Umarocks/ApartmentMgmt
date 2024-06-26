var express = require("express");
var router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../middleware/hash");
const { ensureAuthenticated } = require("../middleware/LoginChecker");
const { IsTenant } = require("../middleware/IsTenant");
const TenantController = require("../controllers/TenantController");
const { IsOwner } = require("../middleware/IsOwner");

// router.get(
//   "/owner/some-protected-route",
//   ensureAuthenticated,
//   IsOwner,
//   someOwnerControllerFunction
// );
router.post("/pay", ensureAuthenticated, IsTenant, TenantController.payRent);

router.post(
  "/complaints",
  ensureAuthenticated,
  IsTenant,
  TenantController.fileComplaint
);

router.get("/lease", ensureAuthenticated, IsTenant, TenantController.viewLease);

router.get("/Info", ensureAuthenticated, IsTenant, TenantController.getInfo);

router.post(
  "/maintenance",
  ensureAuthenticated,
  IsTenant,
  TenantController.requestMaintenance
);

module.exports = router;

// Tenant

// Tenant can pay rent .{Done}
// Tenant can raise complaints.{Done}
// Tenant can check their lease {Done}
// Tenant can see his/her Tenant id.{Done}
// Tenant can see his/her Name.{Done}
// Tenant can see his/her Age.{Done}
// Tenant can see his/her DOB.{Done}
// Tenant can see his/her Room no.{Done}
// Tenant can file regular maintenance {Done}

// Tenant can see the alloted parking slot.

// parking
// employee
// maintains
