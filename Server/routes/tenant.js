var express = require("express");
var router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../middleware/hash");
const { ensureAuthenticated } = require("../middleware/LoginChecker");
const IsTenant = require("../middleware/IsTenant");
const TenantController = require("../controllers/TenantController");
const IsOwner = require("../middleware/IsOwner");

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
router.post(
  "/maintenance/request",
  ensureAuthenticated,
  IsTenant,
  TenantController.requestMaintenance
);

module.exports = router;
