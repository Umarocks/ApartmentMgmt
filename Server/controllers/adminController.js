const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../middleware/hash");
const { getRandomInt } = require("../middleware/randomIntId");

const adminController = {
  createAdmin: async (req, res) => {
    const password = hashPassword(req.body.password);
    console.log(password);
    const emp_id = "A" + uuidv4();
    const { name, shift_timings, email } = req.body;
    let phoneNumber = "+" + req.body.phone;
    phoneNumber = phoneNumber.replace(/-/g, "");
    console.log(phoneNumber);
    const phone = phoneNumber;
    try {
      await pool.query("BEGIN");
      const query1 =
        "INSERT INTO Login (Email,Password,Role) VALUES ($1,$2,$3);";
      await pool.query(query1, [email, password, "Admin"]);

      const query2 =
        "INSERT INTO Admin (Emp_ID, Name, Phone, Shift_Timings, Authorization_Type, Email) VALUES ($1,$2,$3,$4,$5,$6);";
      await pool.query(query2, [
        emp_id,
        name,
        phone,
        shift_timings,
        "Admin",
        email,
      ]);

      await pool.query("COMMIT");
      res.send("Admin creation successful.");
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error in transaction", error.stack);
      res.status(500).send("Error during admin creation");
    }
  },

  createTenant: async (req, res) => {
    const password = hashPassword(req.body.password);
    const emp_id = "T" + uuidv4();
    const {
      name,
      ssn,
      perm_address,
      email,
      age,
      apt_no,
      block_name,
      apt_address,
    } = req.body;
    let phoneNumber = "+" + req.body.phone;
    phoneNumber = phoneNumber.replace(/-/g, "");
    console.log(phoneNumber);
    const phone = phoneNumber;
    const getBlockId = await pool.query(
      "select block_id from block where block_name like ($1) and address like ($2);",
      [block_name, apt_address]
    );
    const block_id = getBlockId.rows[0].block_id;
    const apt_check = await pool.query(
      "SELECT * FROM apartment WHERE apt_no like ($1) and block_id = ($2);",
      [apt_no, block_id]
    );
    if (apt_check.rows.length <= 0) {
      return res.status(404).json({ message: "Apartment Not Found" });
    }
    try {
      await pool.query("BEGIN"); // Start transaction
      const query1 =
        "INSERT INTO Login (Email,Password,Role) VALUES ($1,$2,$3);";
      const params1 = [email, password, "Tenant"]; // Parameters for the first query
      await pool.query(query1, params1);

      const query2 =
        "INSERT INTO Tenant (tenant_id, Name, Ssn, age, perm_address, apt_no, Email,block_id,phone_no) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);";
      const params2 = [
        emp_id,
        name,
        ssn,
        age,
        perm_address,
        apt_no,
        email,
        block_id,
        phone,
      ]; // Parameters for the second query
      await pool.query(query2, params2);

      const query3 =
        "INSERT INTO Tenant_contact (tenant_id, phone) VALUES ($1,$2);";
      const params3 = [emp_id, phone]; // Parameters for the Third query
      await pool.query(query3, params3);
      // If all queries execute successfully, commit the transaction
      await pool.query("COMMIT");
      res.send("Tenant Creation completed successfully.");
    } catch (error) {
      await pool.query("ROLLBACK"); // If any query fails, roll back the transaction
      console.error("Error in transaction", error.stack);
      res.status(500).send("Error during the transaction");
    }
  },

  createOwner: async (req, res) => {
    const password = hashPassword(req.body.password);
    const owner_id = "O" + uuidv4();
    const { name, ssn, address, email } = req.body;
    let phoneNumber = "+" + req.body.phone_no;
    phoneNumber = phoneNumber.replace(/-/g, "");
    console.log(phoneNumber);
    const phone_no = phoneNumber;
    try {
      await pool.query("BEGIN");
      const query1 =
        "INSERT INTO Login (Email,Password,Role) VALUES ($1,$2,$3);";
      await pool.query(query1, [email, password, "Owner"]);

      const query2 =
        "INSERT INTO Owner (owner_id, Name, Ssn, Phone_no, Address, Email) VALUES ($1,$2,$3,$4,$5,$6);";
      await pool.query(query2, [owner_id, name, ssn, phone_no, address, email]);

      await pool.query("COMMIT");
      res.send("Owner creation successful.");
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error in transaction", error.stack);
      res.status(500).send("Error during owner creation");
    }
  },

  getAllTenants: async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM Tenant;");
      res.send(result.rows);
    } catch (error) {
      console.error("Error fetching tenants", error.stack);
      res.status(500).send("Error fetching tenants");
    }
  },

  getAllOwners: async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM Owner;");
      res.send(result.rows);
    } catch (error) {
      console.error("Error fetching owners", error.stack);
      res.status(500).send("Error fetching owners");
    }
  },

  allotParking: async (req, res) => {
    // Business logic for allotting parking
  },

  getAllComplaints: async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM Complaint;");
      res.send(result.rows);
    } catch (error) {
      console.error("Error fetching complaints", error.stack);
      res.status(500).send("Error fetching complaints");
    }
  },

  totalOwnerCount: async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT COUNT(EMAIL) FROM LOGIN WHERE ROLE = 'Owner';"
      );
      res.send(result.rows);
    } catch (error) {
      console.error("Error counting owners", error.stack);
      res.status(500).send("Error counting owners");
    }
  },

  totalTenantCount: async (req, res) => {
    try {
      const result = await pool.query("SELECT COUNT(EMAIL) FROM TENANT;");
      res.send(result.rows);
    } catch (error) {
      console.error("Error counting tenants", error.stack);
      res.status(500).send("Error counting tenants");
    }
  },

  createBlock: async (req, res) => {
    const block_id = getRandomInt();
    const { block_name, address } = req.body;
    console.log(req.body, block_id);
    try {
      await pool.query("BEGIN");
      const query1 =
        "INSERT INTO block (block_id,block_name,address) VALUES ($1,$2,$3);";
      await pool.query(query1, [block_id, block_name, address]);
      await pool.query("COMMIT");
      res.send("Block creation successful.");
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error in transaction", error.stack);
      res.status(500).send("Error during Block creation");
    }
  },

  createApt: async (req, res) => {
    const {
      apt_no,
      bedrooms,
      type,
      area,
      floor,
      address,
      owner_email,
      block_name,
    } = req.body;
    console.log(req.body);
    const getBlockId = await pool.query(
      "SELECT * FROM block WHERE block_name LIKE ($1) AND ADDRESS LIKE ($2);",
      [block_name, address]
    );
    const getOwnerId = await pool.query(
      "select owner_id from owner inner join login on login.email = owner.email where owner.email like ($1);",
      [owner_email]
    );

    if (getBlockId.rows.length <= 0) {
      return res.status(404).json({ message: "Block Not Found" });
    }
    if (getOwnerId.rows.length <= 0) {
      return res.status(404).json({ message: "Owner Not Found" });
    }
    const block_id = getBlockId.rows[0].block_id;
    const owner_id = getOwnerId.rows[0].owner_id;
    console.log(block_id, owner_id);
    try {
      await pool.query("BEGIN");
      const query1 =
        "INSERT INTO apartment (apt_no,block_id,bedrooms,type,area,floor,address,owner_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);";
      await pool.query(query1, [
        apt_no,
        block_id,
        bedrooms,
        type,
        area,
        floor,
        address,
        owner_id,
      ]);
      await pool.query("COMMIT");
      res.send("Apartment creation successful.");
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error in transaction", error.stack);
      res.status(500).send("Error during Apartment creation");
    }
  },

  deleteTenant: async (req, res) => {
    const { email } = req.body;
    const tenantCheck = await pool.query(
      "SELECT ROLE FROM LOGIN WHERE EMAIL LIKE ($1)",
      [email]
    );
    if (
      tenantCheck.rows[0] == undefined ||
      tenantCheck.rows[0].role != "Tenant"
    ) {
      return res.status(404).json({ message: "Tenant Not Found" });
    }
    try {
      await pool.query("BEGIN");
      const query1 = "DELETE FROM LOGIN WHERE email LIKE ($1);";
      await pool.query(query1, [email]);
      await pool.query("COMMIT");
      res.send("Tenant " + email + " Deleted successfully.");
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error in transaction", error.stack);
      return res.status(404).json("Error during owner creation");
    }
  },
  getTotalComplaints: async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT count(complaint_id) FROM Complaint;"
      );
      res.send(result.rows[0]);
    } catch (error) {
      console.error("Error fetching complaints count", error.stack);
      res.status(500).send("Error fetching complaints count");
    }
  },

  createEmployee: async (req, res) => {
    const password = hashPassword(req.body.password);
    console.log(password);
    const emp_id = "E" + uuidv4();
    const { name, phone, shift_timings, email, contract_length } = req.body;
    try {
      await pool.query("BEGIN");
      const query1 =
        "INSERT INTO Login (Email,Password,Role) VALUES ($1,$2,$3);";
      await pool.query(query1, [email, password, "Employee"]);

      const query2 =
        "INSERT INTO maintenance_staff (Emp_ID, Name, Phone, Shift_Timings, role, Email,contract_length) VALUES ($1,$2,$3,$4,$5,$6,$7);";
      await pool.query(query2, [
        emp_id,
        name,
        phone,
        shift_timings,
        "Employee",
        email,
        contract_length,
      ]);

      await pool.query("COMMIT");
      res.send("Employee creation successful.");
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error in transaction", error.stack);
      res.status(500).send("Error during Employee creation");
    }
  },
};

module.exports = { adminController };
