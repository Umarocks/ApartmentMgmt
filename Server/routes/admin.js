var express = require("express");
var router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../middleware/hash");

const { IsAdmin } = require("../middleware/IsAdmin");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../middleware/LoginChecker");

// create admin user
router.post(
  "/createAdmin",
  ensureAuthenticated,
  IsAdmin,
  async function (req, res) {
    res.write("Login Created");
    console.log(req.body);
    const password = hashPassword(req.body.password);
    const emp_id = "A" + uuidv4();
    console.log(emp_id);
    console.log(password);
    const { name, phone, shift_timings, email } = req.body;

    // const result = await pool.query(
    //   "INSERT INTO Login (Email,Password,Role) VALUES ($1,$2,$3);",
    //   [req.body.Email, password, "Admin"]
    // );
    // INSERT INTO Login (Email,Password,Role) VALUES ('john@example.com','admin123','Admin');

    // INSERT INTO Admin (Emp_ID, Name, Phone, Shift_Timings, Authorization_Type, Email)
    // VALUES ('A88494d28-3ef3-45ff-91bf-04a50b6d2d8e', 'John', '1234567890', '9:00 AM - 5:00 PM', 'Admin', 'john@example.com');

    // Admin Schema , Make sure admin has A in the emp_id
    //       select * from admin;
    //                 emp_id                 |    name    |   phone    |   shift_timings   | authorization_type |      email
    // ---------------------------------------+------------+------------+-------------------+--------------------+------------------
    //  A88494d28-3ef3-45ff-91bf-04a50b6d2d8e | John       | 1234567890 | 9:00 AM - 5:00 PM | Admin              | john@example.com

    res.send();
  }
);

//create owner
router.post(
  "/createOwner",
  ensureAuthenticated,
  IsAdmin,
  async function (req, res) {}
);

//create tenant
router.post(
  "/createTenant",
  ensureAuthenticated,
  IsAdmin,
  async function (req, res) {}
);

//show all tenant detail
router.get(
  "/getAllTenant",
  ensureAuthenticated,
  IsAdmin,
  async function (req, res) {}
);

//show all owner detail
router.get(
  "/getAllOwner",
  ensureAuthenticated,
  IsAdmin,
  async function (req, res) {}
);

//allot parking slot
router.post(
  "/AllotParking",
  ensureAuthenticated,
  IsAdmin,
  async function (req, res) {}
);

// view complain
router.get(
  "/getAllComplaint",
  ensureAuthenticated,
  IsAdmin,
  async function (req, res) {}
);

// total owner count
router.get(
  "/totalOwner",
  ensureAuthenticated,
  IsAdmin,
  async function (req, res) {}
);

//total tenant count
router.get(
  "/totalTenant",
  ensureAuthenticated,
  IsAdmin,
  async function (req, res) {}
);

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
