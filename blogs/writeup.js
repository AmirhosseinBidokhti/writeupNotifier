const { pool } = require("../database/dbConnect");

//other syntax
//const correntTime = require('../utils/currentTime')
//correntTime.getCurrentTime()
const { getCurrentTime } = require("../utils/currentTime");

class WriteUp {
  constructor(title, url) {
    this.title = title;
    this.url = url;
    this.query = {
      text: "",
      values: [],
    };
  }

  getTitle() {
    return this.title;
  }

  getUrl() {
    return this.url;
  }

  getQuery() {
    return this.query;
  }

  setQuery(text, values) {
    this.query.text = text;
    this.query.values = values;
  }

  // query DB and check if the writeup already exists or not.
  // return a boolean
  exist() {
    this.setQuery("SELECT * FROM writeups WHERE url = $1 AND title = $2", [
      this.getUrl(),
      this.getTitle(),
    ]);

    pool.query(this.getQuery(), (err, res) => {
      if (err) {
        console.error(err.stack);
      }

      console.log(res.rows.length);
      console.log(this.getUrl());
    });
  }

  // once we made sure the writeup does not exist, add it to database.
  add() {
    this.setQuery(
      "INSERT INTO writeups(title, url, create_date) VALUES($1, $2, $3)",
      [this.getTitle(), this.getUrl(), getCurrentTime()]
    );

    pool.query(this.getQuery(), (err, res) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log(res.rows);
    });
  }
}

const writeup = new WriteUp("west", "https://test.com");

writeup.add();

// writeup.exist();

// this is working fine. now figure out why the earlier code didnt
// pool.query(
//   "SELECT * FROM writeups WHERE url = $1 AND title = $2",
//   [
//     "https://fuckkkkkkkkkfakkkkkkefriend.com/fkewhfjwhkfwe/ewfkewhfuhwef/wejfgweyfgywef",
//     "helloooo fake writeuppppp",
//   ],
//   (err, res) => console.log(res.rows)
// );
