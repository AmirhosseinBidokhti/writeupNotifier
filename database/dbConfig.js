require("dotenv").config({ path: "../.env" });

const dbConfig = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};

//exports.module = { dbConfig };

exports.dbConfig = dbConfig;

// fuck commonjs. es6+ syntax is lit!
