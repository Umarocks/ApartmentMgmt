var express = require("express");
var router = express.Router();
const pool = require("../db");
/* GET home page. */
router.post("/addTodo", async function (req, res, next) {
  try {
    const { description } = req.body;
    console.log(description);
    const newTodo = await pool.query(
      "INSERT INTO TODO (description) VALUES($1)",
      [description]
    );
    console.log(newTodo);
    res.json(newTodo);
  } catch (err) {
    res.send(err);
  }
});
router.get("/addTodo", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("addTodo");
  }
});
module.exports = router;
