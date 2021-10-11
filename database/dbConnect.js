const { dbConfig } = require("./dbConfig");

const Pool = require("pg").Pool;

console.log(dbConfig);

const pool = new Pool(dbConfig);

// pool.query("SELECT * from writeups", (err, res) => {
//   if (err) {
//     throw `there was an error: ${err.message}`;
//   }

//   console.log(res.rows);
// });

exports.pool = pool;
