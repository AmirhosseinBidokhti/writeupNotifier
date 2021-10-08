const { pool } = require("../database/dbConnect");

class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  age() {
    let date = new Date();
    return date.getFullYear() - this.year;
  }
}

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
    // pool.query(this.getQuery(), (err, res) => {
    //   if (err) {
    //     console.error(err.stack);
    //   }

    //   console.log(res.rows.length);
    // });
  }

  // once we made sure the writeup does not exist, add it to database.
  add() {}
}

const writeup = new WriteUp(
  "helloooo fake writeuppppp",
  "https://fuckkkkkkkkkfakkkkkkefriend.com/fkewhfjwhkfwe/ewfkewhfuhwef/wejfgweyfgywef"
);

writeup.exist();

// this is working fine. now figure out why the earlier code didnt
// pool.query(
//   "SELECT * FROM writeups WHERE url = $1 AND title = $2",
//   [
//     "https://fuckkkkkkkkkfakkkkkkefriend.com/fkewhfjwhkfwe/ewfkewhfuhwef/wejfgweyfgywef",
//     "helloooo fake writeuppppp",
//   ],
//   (err, res) => console.log(res.rows)
// );
