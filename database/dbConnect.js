const { dbConfig } = require("./dbConfig");

const Pool = require("pg").Pool;

exports.pool = new Pool(dbConfig);
