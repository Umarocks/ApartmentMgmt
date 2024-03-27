var express = require("express");
var router = express.Router();
const pool = require("../db");
const uuid = require("uuidv4");
const { IsAdmin } = require("../middleware/IsAdmin");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../middleware/LoginChecker");

// create admin user
router.post("/createAdmin", ensureAuthenticated, IsAdmin, function (req, res) {
  res.write("Login Created");
  // res.write(req.body);
  res.send();
});

//create owner
router.post("/createOwner", function (req, res) {});

//create tenant
router.post("/createTenant", function (req, res) {});

//show all tenant detail
router.get("/getAllTenant", function (req, res) {});

//show all owner detail
router.get("/getAllOwner", function (req, res) {});

//allot parking slot
router.post("/AllotParking", function (req, res) {});

// view complain
router.get("/getAllComplaint", function (req, res) {});

// total owner count
router.get("/totalOwner", function (req, res) {});

//total tenant count
router.get("/totalTenant", function (req, res) {});

//total employee count
module.exports = router;
// Admin can login. {DONE}
// Admin can view the tenant and owner details.
// Admin can create owner.
// Admin can allot parking slot.
// Admin can view the complaints.
// Admin can see total Owners.
// Admin can see total Tenants.
// Admin can see total Employee.
