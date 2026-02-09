const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', async (req, res) => {
    try {
      console.log(`[API] Requesting teams from current season`);

      const currYear = new Date().getFullYear();
      const [teams] = await db.query(`SELECT * FROM teams WHERE season=?`, [currYear]);

      res.status(200).send(teams);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
})

module.exports = router;