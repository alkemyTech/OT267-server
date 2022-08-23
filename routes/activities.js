// Default imports
const { query } = require("express");
const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
