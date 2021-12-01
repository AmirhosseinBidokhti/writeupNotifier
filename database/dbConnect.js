const dbConfig = require("./dbConfig");

const Pool = require("pg").Pool;

console.log(
  `Connecting to database of ${dbConfig.database} at ${dbConfig.host}:${dbConfig.port}`
);

const pool = new Pool(dbConfig);

module.exports = pool;
