const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../middleware/hash");

const TenantController = {
  payRent: async (req, res) => {
    // Implementation for paying rent
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

  // Additional methods for other tenant functionalities...
};

module.exports = TenantController;
