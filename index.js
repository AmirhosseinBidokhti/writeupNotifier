const { pool } = require("./database/dbConnect");

const { readFile } = require("./utils/readFile");

var axios = require("axios");
var JSSoup = require("jssoup").default;

pool.query("SELECT * from writeups", (err, res) => {
  if (err) {
    throw `there was an error: ${err.message}`;
  }

  console.log(res.rows);
});

readFile("./blogs/urls.txt");

const res = axios
  .get("https://securitytrails.com/blog.rss")
  .then((res) => {
    var soup = new JSSoup(res.data);

    const titles = soup.findAll("title");
    console.log(titles);
    titles.map((title) => console.log(title.nextElement._text));
    //const link = soup.findAll("link");

    //console.log(link);
  })
  .catch((err) => console.log(err));
