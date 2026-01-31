const mysql = require("mysql2/promise");
require("dotenv").config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
console.log(`Accessing mysql database ${process.env.DB_DATABASE} with username ${process.env.DB_USERNAME}`);
module.exports = db;