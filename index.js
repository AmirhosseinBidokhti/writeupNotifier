//const { pool } = require("./database/dbConnect");

const { readFile } = require("./utils/readFile");

var axios = require("axios");
var JSSoup = require("jssoup").default;
const { sendNotification } = require("./utils/sendNotification");

const res = axios
  .get("https://bitquark.co.uk/blog/feed.rss")
  .then((res) => {
    var soup = new JSSoup(res.data);

    const items = soup.findAll("item");
    const titles = soup.findAll("title");
    const links = soup.findAll("link");
    const pubDates = soup.findAll("pubDate");

    //console.log(items);

    //titles.map((title) => console.log(title.nextElement._text));
    titles.map((title, idx) => {
      if (title.parent.name === "item") {
        console.log(`${idx}. ${title.nextElement._text}`);

        sendNotification(title.nextElement._text);
      }
    });
    //links.map((link) => console.log(link.nextElement._text));
    //pubDates.map((pubDate) => console.log(pubDate.nextElement._text));
  })
  .catch((err) => console.log(err));
