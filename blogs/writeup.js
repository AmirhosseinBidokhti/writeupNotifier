const pool = require("../database/dbConnect");

const { getCurrentTime } = require("../utils/currentTime");

class Writeup {
  constructor(title, url, pub_date) {
    this.title = title;
    this.url = url;
    this.pub_date = pub_date;
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

  getPubDate() {
    return this.pub_date;
  }

  getQuery() {
    return this.query;
  }

  setQuery(text, values) {
    this.query.text = text;
    this.query.values = values;
  }

  exist() {
    this.setQuery("SELECT * FROM writeups WHERE url = $1 AND title = $2", [
      this.getUrl(),
      this.getTitle(),
    ]);

    let state = false;

    pool.query(this.getQuery(), (err, res) => {
      if (err) {
        console.error(err.stack);
      }
      if (res.rows.length && res.rows[0].url == this.getUrl()) {
        console.log("Writeup already exist!");
        pool.end();
        state = true;
      } else {
        console.log("Writeup not in database!");
        pool.end();
        state = false;
      }
    });

    return new Promise((resolve, reject) => resolve(state));
  }

  async add() {
    if ((await this.exist()) == false) {
      this.setQuery(
        "INSERT INTO writeups(title, url, create_date) VALUES($1, $2, $3)",
        [this.getTitle(), this.getUrl(), getCurrentTime()]
      );

      pool.query(this.getQuery(), (err, res) => {
        if (err) {
          console.log(err.message);
          pool.end();
        }
        console.log(res.rows);
      });
    } else {
      console.log("fuck off");
    }
  }
}

module.exports = Writeup;

var test = new Writeup("foo", "bar.com", "444");

test.add();
