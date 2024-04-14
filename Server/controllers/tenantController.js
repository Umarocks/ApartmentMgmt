const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../middleware/hash");

const TenantController = {
  payRent: async (req, res) => {
    try {
      const { mode, payment_date, amount, apt_no } = req.body;
      const ownerResult = await pool.query(
        "select owner_id from tenant t left join apartment a on t.apt_no = a.apt_no where t.tenant_id like ($1);",
        [req.user.tenant_id]
      );
      const owner_id = ownerResult.rows[0].owner_id;
      const date = new Date();
      const payment_id = "P" + uuidv4();
      const result = await pool.query(
        "INSERT INTO payment (payment_id, mode, payment_date, amount, owner_id, tenant_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [payment_id, mode, date, amount, owner_id, req.user.tenant_id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error filing complaint", error.stack);
      res.status(500).send("Error filing complaint");
    }
  },

  fileComplaint: async (req, res) => {
    try {
      const { complaint_description } = req.body;
      const date = new Date();
      const complaint_id = "CP" + uuidv4();
      const result = await pool.query(
        "INSERT INTO Complaint (complaint_id ,complaint_description, complaint_date ,tenant_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [complaint_id, complaint_description, date, req.user.tenant_id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error filing complaint", error.stack);
      res.status(500).send("Error filing complaint");
    }
  },

  viewLease: async (req, res) => {
    // Implementation for lease
    try {
      const { tenant_id } = req.body;
      const result = await pool.query(
        "SELECT t.name,t.age,t.perm_address,t.apt_no,t.email,r.rent_amount,a.apt_no,a.block_id,a.bedrooms,a.type,a.floor,a.address from tenant t join rents r on r.tenant_id = t.tenant_id join apartment a on a.apt_no = t.apt_no where t.tenant_id like ($1);",
        [tenant_id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error filing complaint", error.stack);
      res.status(500).send("Error filing complaint");
    }
  },

  requestMaintenance: async (req, res) => {
    // Implementation for requesting maintenance
    try {
      const date = new Date();
      const complaint_id = "CP" + uuidv4();
      const result = await pool.query(
        "INSERT INTO Complaint (complaint_id ,complaint_description, complaint_date ,tenant_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [complaint_id, "Regular Maintainence", date, req.user.tenant_id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error filing complaint", error.stack);
      res.status(500).send("Error filing complaint");
    }
  },

  getInfo: async (req, res) => {
    console.log(req.user);
    try {
      const result = await pool.query(
        "SELECT Name, Age, Perm_Address, A.Apt_No, T.Email, A.Address, A.Floor, A.Type, A.Area, A.Bedrooms FROM Tenant T INNER JOIN Apartment A ON T.Apt_No = A.Apt_No AND T.Block_Id = A.Block_Id WHERE Email LIKE ($1);",
        [req.user.email]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error filing complaint", error.stack);
      res.status(500).send("Error getting tenant info");
    }
  },

  // Additional methods for other tenant functionalities...
};

module.exports = TenantController;
