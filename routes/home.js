const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    song1title: "Express Testinggg",
    song1votes: 'num',
  });
});

module.exports = router;
