const express = require('express');
const router = express.Router();

const db = require('../db');

const ensure_exists = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS teams (
      id             INT           AUTO_INCREMENT PRIMARY KEY,
      team_name      VARCHAR(40)   NOT NULL UNIQUE,
      team_color     VARCHAR(6)    NOT NULL UNIQUE,
      conference     VARCHAR(40)   NOT NULL,
      joindate       DATE          DEFAULT (CURRENT_DATE)
    )
  `);
};
ensure_exists();

router.get('/', (req, res) => {
    // do nothing
})

module.exports = router;