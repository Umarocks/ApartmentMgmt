var express = require("express");
var router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../middleware/hash");
const { adminController } = require("../controllers/adminController");
const { ownerController } = require("../controllers/OwnerController");

const { IsAdmin } = require("../middleware/IsAdmin");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../middleware/LoginChecker");

router.post("/createAdmin", ensureAuthenticated, IsAdmin, adminController.createAdmin);                 
router.post("/createOwner", ensureAuthenticated, IsAdmin, adminController.createOwner);                   
router.get("/getAllTenant", ensureAuthenticated, IsAdmin, adminController.getAllTenants);
router.get("/getAllOwner", ensureAuthenticated, IsAdmin, adminController.getAllOwners);
router.post("/AllotParking", ensureAuthenticated, IsAdmin, adminController.allotParking);
router.get("/getAllComplaint", ensureAuthenticated, IsAdmin, adminController.getAllComplaints);
router.get("/totalOwner", ensureAuthenticated, IsAdmin, adminController.totalOwnerCount);
router.get("/totalTenant", ensureAuthenticated, IsAdmin, adminController.totalTenantCount);


//create tenant
router.post(
  "/createTenant",
  ensureAuthenticated,
  IsAdmin,
  async function (req, res) {}
);

module.exports = router;

//total employee count
// Admin can login. {DONE}
// Admin can view the tenant and owner details.
// Admin can create owner.
// Admin can allot parking slot.
// Admin can view the complaints.
// Admin can see total Owners.
// Admin can see total Tenants.
// Admin can see total Employee.


// TO DO:
// create tenants
// delete tenant or specific tenant/owner
//  add apartments or register new apartments
//  allocate apartments or something like that 