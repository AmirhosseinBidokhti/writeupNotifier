const pool = require("../database/dbConnect");

const { getCurrentTime } = require("../utils/currentTime");

function checkWriteupExist(url) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM writeups WHERE url = $1", [url], (err, res) => {
      if (err) {
        reject(err);
        pool.end();
      }
      if (res.rows.length) {
        resolve(true);
        //pool.end();
      } else {
        resolve(false);
        //pool.end();
      }
    });
  });
}

function addWriteup({ title, link, pubDate }) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO writeups(title, url, pub_date, create_date) VALUES($1, $2, $3, $4)",
      [title, link, pubDate, getCurrentTime()],
      (err, res) => {
        if (err) {
          reject(`Error adding to database: ${err.message}`);
          //pool.end();
        }
        resolve(res);
      }
    );
  });
}

function getAllWriteups() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT title, url, pub_date FROM writeups", (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
        pool.end();
      }
      if (res.rows.length) {
        resolve(res.rows);
      }
    });
  });
}

module.exports = { checkWriteupExist, addWriteup, getAllWriteups };
