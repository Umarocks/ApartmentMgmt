const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../middleware/hash");


const adminController = {

    createAdmin: async (req, res) => {
        const password = hashPassword(req.body.password);
        console.log(password);
        const emp_id = "A" + uuidv4();
        const { name, phone, shift_timings, email } = req.body;
        try {
            await pool.query("BEGIN");
            const query1 = "INSERT INTO Login (Email,Password,Role) VALUES ($1,$2,$3);";
            await pool.query(query1, [email, password, "Admin"]);
    
            const query2 = "INSERT INTO Admin (Emp_ID, Name, Phone, Shift_Timings, Authorization_Type, Email) VALUES ($1,$2,$3,$4,$5,$6);";
            await pool.query(query2, [emp_id, name, phone, shift_timings, "Admin", email]);
    
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
        console.log(password);
        const emp_id = "T" + uuidv4();
         //  implement after dealing with apartments  
    },


    createOwner: async (req, res) => {
        const password = hashPassword(req.body.password);
        const owner_id = "O" + uuidv4();
        const { name, ssn, phone_no, address, email } = req.body;
        try {
            await pool.query("BEGIN");
            const query1 = "INSERT INTO Login (Email,Password,Role) VALUES ($1,$2,$3);";
            await pool.query(query1, [email, password, "Owner"]);
    
            const query2 = "INSERT INTO Owner (owner_id, Name, Ssn, Phone_no, Address, Email) VALUES ($1,$2,$3,$4,$5,$6);";
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
            const result = await pool.query("SELECT COUNT(EMAIL) FROM LOGIN WHERE ROLE = 'Owner';");
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
    }
};


module.exports = { adminController };

