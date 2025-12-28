const mysql = require("mysql2/promise");
const env = require("../process.env");
const db = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE
});
console.log(`Accessing mysql database ${env.DB_DATABASE} with username ${env.DB_USERNAME}`);
module.exports = db;