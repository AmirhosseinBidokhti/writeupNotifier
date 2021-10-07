import axios from "axios";
import { pool } from "./database/dbConnect.js";
import { readFile } from "./utils/readFile.js";

pool.query("SELECT * from writeups", (err, res) => {
  if (err) {
    throw `there was an error: ${err.message}`;
  }

  console.log(res.rows);
});

//readFile("./blogs/urls.txt");

const res = axios
  .get("https://securitytrails.com/blog.rss")
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
