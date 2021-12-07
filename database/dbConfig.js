require("dotenv").config({ path: "../.env" });

const dbConfig = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};

//console.log(dbConfig);

module.exports = dbConfig;
