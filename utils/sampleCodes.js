const { pool } = require("../database/dbConnect");

//const { readFile } = require("./utils/readFile");

var axios = require("axios");
var JSSoup = require("jssoup").default;

pool.query("SELECT * from writeups", (err, res) => {
  if (err) {
    throw `there was an error: ${err.message}`;
  }

  console.log(res.rows);
});

//readFile("./blogs/urls.txt");
