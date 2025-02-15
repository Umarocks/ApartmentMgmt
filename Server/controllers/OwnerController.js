const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../middleware/hash");

const OwnerController = {
  // viewProperties: async (req, res) => {
  //   try {
  //     const result = await pool.query(
  //       "SELECT * FROM Apartment WHERE owner_id = $1",
  //       [req.user.owner_id]
  //     );
  //     res.json(result.rows);
  //   } catch (error) {
  //     console.error("Error fetching properties", error.stack);
  //     res.status(500).send("Error fetching properties");
  //   }
  // },

  viewProperties: async (req, res) => {
    let query;
    let queryParams;

    if (req.user.role === "Owner") {
      query = "SELECT * FROM apartment;";
      queryParams = [];
    } else if (req.user.role === "Owner") {
      query = "SELECT * FROM apartment WHERE owner_id = $1;";
      queryParams = [req.user.owner_id];
    }

    try {
      const result = await pool.query(query, queryParams);
      console.log(result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching properties", error.stack);
      res.status(500).send("Error fetching properties");
    }
  },

  getAllComplaint: async (req, res) => {
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

  respondToComplaint: async (req, res) => {
    // Implementation for responding to a complaint or some other use case
    res.send(req.body);
  },

  viewPayments: async (req, res) => {
    try {
      // need to edit query to get payments made to the owner's properties
      const result = await pool.query(
        "SELECT * FROM Payment WHERE owner_id = $1",
        [req.user.owner_id]
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching payments", error.stack);
      res.status(500).send("Error fetching payments");
    }
  },
};

module.exports = OwnerController;
