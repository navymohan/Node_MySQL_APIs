const mysql = require("mysql");
const dbConfig = require("./db_config.js");

var connection = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

module.exports = connection;