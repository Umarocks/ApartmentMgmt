const pool = require('../db');
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../middleware/hash");

const TenantController = {
    payRent: async (req, res) => {
        // Implementation for paying rent
    },

    fileComplaint: async (req, res) => {
        try {
           
            const { complaint_description } = req.body;
            const result = await pool.query('INSERT INTO Complaint (complaint_description, tenant_id) VALUES ($1, $2) RETURNING *', [complaint_description, req.user.tenant_id]);
            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error filing complaint', error.stack);
            res.status(500).send('Error filing complaint');
        }
    },

    viewLease: async (req, res) => {
       // Implementation for lease
    },

    requestMaintenance: async (req, res) => {
        // Implementation for requesting maintenance
    },

    // Additional methods for other tenant functionalities...
};

module.exports = TenantController;
