var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/apply", async (req, res, next) => {
  const { email, name, phone, address, apt_no, block_name } = req.body;
  try {
    await pool.query("BEGIN");
    const query1 =
      "SELECT OWNER_ID FROM OWNER WHERE OWNER_ID IN (SELECT * FROM APARTMENT WHERE ADDRESS LIKE ($1) AND BLOCK_NAME LIKE ($2) AND APT_NO LIKE ($3));";
    const result = await pool.query(query1, [address, block_name, apt_no]);
    const { block_id, owner_id } = result.rows[0];
    const query2 =
      "INSERT INTO apartment_application (email,phone,name,owner_id,apt_no,address,block_id) VALUES ($1,$2,$3,$4,$5,$6);";
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
