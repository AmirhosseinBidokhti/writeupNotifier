const blogParser = require("./blogs/parser");
const colors = require("colors");
require("dotenv").config({ path: ".env" });
const { checkWriteupExist, addWriteup } = require("./blogs/writeup");
const msgFormatter = require("./utils/msgFormatter");
const { checkLinkDNS } = require("./utils/checkLink");
const { RSS_BLOGS } = require("./blogs/resources");
const { sendNotification } = require("./utils/sendNotification");
const iterateWithDelay = require("./utils/iterateWithDelay");
const banner = require("./utils/banner");

async function mainCallback(blog) {
  try {
    console.log(`[+] Parsing content of: ${blog}`.bgWhite.black);

    let writeups = await blogParser(blog);

    if (writeups !== undefined && writeups.length) {
      writeups.map(async (writeup, idx) => {
        let exists = await checkWriteupExist(writeup.link);
        if (exists) {
          console.log(
            `[-]: ${writeup.title} already exists! `.red + `Not adding it.`.gray
          );
          return;
        } else {
          console.log(`[+]: Adding ${writeup.title}`.green);
          await addWriteup(writeup);
          await sendNotification(msgFormatter(writeup));
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  banner();
  const liveLinks = await checkLinkDNS(RSS_BLOGS);

  liveLinks.map((RSSBlog, idx) =>
    iterateWithDelay(RSSBlog, idx, 3000, mainCallback)
  );
}

main();
