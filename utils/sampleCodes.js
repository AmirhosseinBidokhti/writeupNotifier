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

// const writeup = new WriteUp("west", "https://test.com");

// //writeup.add();

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

//---------------------------------------------------

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

      if (res.rows.length && res.rows[0].url == this.getUrl()) {
        console.log("already exists");
      } else {
        console.log("didn't found in db. gotta add it");
        pool.end();
      }
    });

    pool.end();
  }

  // once we made sure the writeup does not exist, add it to database.
  add() {
    this.setQuery(
      "INSERT INTO writeups(title, url, pub_date, create_date) VALUES($1, $2, $3)",
      [this.getTitle(), this.getUrl(), this.getPubDate(), getCurrentTime()]
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

// async function test() {
//   await console.log("test");
//   return "you should";
// }

// let x = test().then((x) => console.log(x));

// console.log(x);

async function checkWriteupExist(url) {
  const queryString = "SELECT * FROM writeups WHERE url = $1";
  const queryValues = [url];

  let exist = false;

  await pool.query(queryString, queryValues, (err, res) => {
    if (err) {
      console.log(err);
      pool.end();
    }
    if (res.rows.length) {
      exist = res.rows;
    } else {
      exist = res.rows;
    }
  });
  return exist;
}

async function fn() {
  try {
    let result = await checkWriteupExist(
      "https://portswigger.net/blog/introducing-dom-invader"
    );

    console.log(`result: ${result}`);
  } catch (error) {
    console.log(error);
  }
}

// old add to db
pool.query(
  "INSERT INTO writeups(title, url, pub_date, create_date) VALUES($1, $2, $3, $4)",
  [title, url, pubDate, getCurrentTime()],
  (err, res) => {
    if (err) {
      console.log(err.message);
      pool.end();
    }
  }
);
//pool.end();

// now kinda works. pool end with addwriteup (?)

// async function main() {
//   try {
//     const res = await checkWriteup("amir.com");
//     console.log(res);

//     if (res == false) {
//       console.log("adding...");
//       addWriteup("feet", "amir.com");
//     } else {
//       console.log("hmm, can't add it");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

////////////////////////////////////////////////////////////////
////////
//////// old shit jssoup
////////

const { readFile } = require("./utils/readFile");

//var WriteUp = require("./blogs/writeup");
var axios = require("axios");
var JSSoup = require("jssoup").default;
const { sendNotification } = require("./utils/sendNotification");

const res = axios
  .get("https://blog.intigriti.com/feed/")
  .then((res) => {
    var soup = new JSSoup(res.data);

    const items = soup.findAll("item");

    items.map((item, idx) => {
      const eye = encodeURIComponent("👀");
      const link = encodeURIComponent("🔗");
      const date = encodeURIComponent("📆");

      // var msg = [
      //   `${eye} ${item.nextElement.nextElement._text}`,
      //   `${link} ${item.contents[1].nextElement._text}`,
      //   `${date} ${item.contents[6].previousElement._text}`,
      // ].join("\n");

      if (idx === 0) {
        console.log(item);
        return;
      }

      //sendNotification(msg);
    });

    //console.log(items[2].contents[1].nextElement._text);

    // PUB DATE FOR ITEM (NOT SURE)
    //console.log(items[2].contents[6].previousElement._text);

    // LINK FOR THE ITEM (not true)
    //console.log(items[2].previousElement._text);

    // TITLE FOR THE ITEM
    //console.log(items[2].nextElement.nextElement._text);

    // items iterate -> access to _text: 'url link', _text: 'post title', SoupTag: name pubDate

    //titles.map((title) => console.log(title.nextElement._text));
    // titles.map((title, idx) => {
    //   if (title.parent.name === "item") {
    //     console.log(`${idx}. ${title.nextElement._text}`);

    //     // var article = new WriteUp(title, "test.com");
    //     // article.exist();

    //     //sendNotification(title.nextElement._text);
    //   }
    // });
    //links.map((link) => console.log(link.nextElement._text));
    //pubDates.map((pubDate) => console.log(pubDate.nextElement._text));
  })
  .catch((err) => console.log(err));

async function fn() {
  try {
    let blogs = await blogParser("https://blog.intigriti.com/feed/");
    console.log(blogs);
  } catch (error) {}
}

//blogParser("https://blog.intigriti.com/feed/").then((el) => console.log(el));

fn();
