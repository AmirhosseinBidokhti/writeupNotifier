const dbConfig = require("./dbConfig");
const colors = require("colors");

const Pool = require("pg").Pool;

console.log(
  `Connecting to database of ${dbConfig.database} at ${dbConfig.host}:${dbConfig.port}`
    .yellow
);

const pool = new Pool(dbConfig);

module.exports = pool;
