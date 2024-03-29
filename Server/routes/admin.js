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
    console.log(req.body);
    const password = hashPassword(req.body.password);
    const emp_id = "A" + uuidv4();
    console.log(emp_id);
    console.log(password);
    const { name, phone, shift_timings, email } = req.body;
    try {
      await pool.query("BEGIN"); // Start transaction
      // Replace these with your actual queries
      const query1 =
        "INSERT INTO Login (Email,Password,Role) VALUES ($1,$2,$3);";

      const params1 = [email, password, "Admin"]; // Parameters for the first query
      await pool.query(query1, params1);

      const query2 =
        "INSERT INTO Admin (Emp_ID, Name, Phone, Shift_Timings, Authorization_Type, Email) VALUES ($1,$2,$3,$4,$5,$6);";
      const params2 = [emp_id, name, phone, shift_timings, "Admin", email]; // Parameters for the second query
      await pool.query(query2, params2);

      // If all queries execute successfully, commit the transaction
      await pool.query("COMMIT");
      res.send("Transaction Admin Creation completed successfully.");
    } catch (error) {
      await pool.query("ROLLBACK"); // If any query fails, roll back the transaction
      console.error("Error in transaction", error.stack);
      res.status(500).send("Error during the transaction");
    }
  }
);

//create owner
router.post(
  "/createOwner",
  ensureAuthenticated,
  IsAdmin,
  async function (req, res) {
    console.log(req.body);
    const password = hashPassword(req.body.password);
    const emp_id = "O" + uuidv4();
    console.log(emp_id);
    console.log(password);
    const { name, ssn, phone_no, address, email } = req.body;
    console.log("Success");
    try {
      await pool.query("BEGIN"); // Start transaction
      // Replace these with your actual queries
      const query1 =
        "INSERT INTO Login (Email,Password,Role) VALUES ($1,$2,$3);";
      const params1 = [email, password, "Owner"]; // Parameters for the first query
      await pool.query(query1, params1);

      const query2 =
        "INSERT INTO Owner (owner_id, Name, Ssn, Phone_no, Address, Email) VALUES ($1,$2,$3,$4,$5,$6);";
      const params2 = [emp_id, name, ssn, phone_no, address, email]; // Parameters for the second query
      await pool.query(query2, params2);

      // If all queries execute successfully, commit the transaction
      await pool.query("COMMIT");
      res.send("Transaction Owner Creation completed successfully.");
    } catch (error) {
      await pool.query("ROLLBACK"); // If any query fails, roll back the transaction
      console.error("Error in transaction", error.stack);
      res.status(500).send("Error during the transaction");
    }
  }
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
