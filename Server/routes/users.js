var express = require("express");
var router = express.Router();
const pool = require("../db");
const { phoneNumber } = require("../middleware/phone");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
// figure out how to find block id and owner id. this is messy and collisions
router.post("/apply", async (req, res) => {
  const { email, name, address, apt_no, block_id, block_name, owner_id } =
    req.body;
  const phone = phoneNumber(req.body.phone);

  try {
    await pool.query("BEGIN");
    const query1 =
      "SELECT OWNER_ID FROM OWNER WHERE OWNER_ID IN (SELECT * FROM APARTMENT WHERE ADDRESS LIKE ($1) AND block_id LIKE ($2) AND apt_no LIKE ($3));";
    const result = await pool.query(query1, [address, block_id, apt_no]);
    // const { block_id, owner_id } = result.rows[0];
    const query2 =
      "INSERT INTO apartment_application (email,phone,name,owner_id,apt_no,addresss,block_id) VALUES ($1,$2,$3,$4,$5,$6,$7);";
    await pool.query(query2, [
      email,
      phone,
      name,
      owner_id,
      apt_no,
      address,
      block_id,
    ]);

    await pool.query("COMMIT");
    res.send("Admin creation successful.");
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error in transaction", error.stack);
    res.status(500).send("Error during admin creation");
  }
});

module.exports = router;
//               Table "public.apartment_application"
//   Column  |         Type          | Collation | Nullable | Default
// ----------+-----------------------+-----------+----------+---------
//  email    | emaildomain           |           | not null |
//  phone    | phonenodomain         |           | not null |
//  name     | character(20)         |           |          |
//  owner_id | id                    |           |          |
//  apt_no   | character varying(10) |           |          |
//  addresss | character varying(50) |           |          |
//  block_id | integer               |           |          |
