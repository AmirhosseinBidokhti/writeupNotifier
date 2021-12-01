let Parser = require("rss-parser");
const blogParser = require("./blogs/parser");
const colors = require("colors");

require("dotenv").config({ path: ".env" });
const {
  checkWriteupExist,
  addWriteup,
  getAllWriteups,
} = require("./blogs/write");
const msgFormatter = require("./utils/msgFormatter");
const checkLink = require("./utils/checkLink");
const { RSS_BLOGS } = require("./blogs/resources");

const { sendNotification } = require("./utils/sendNotification");

let parser = new Parser();

async function mainCallback(blog) {
  try {
    const linkAlive = await checkLink(blog);

    if (linkAlive.status === 200) {
      let writeups = await blogParser(blog);

      if (writeups !== undefined && writeups.length) {
        writeups.map(async (writeup, idx) => {
          let exists = await checkWriteupExist(writeup.link);

          if (exists) {
            console.log(`${writeup.title} already exists! Not adding it.`.red);
            return;
          } else {
            console.log(`Adding ${writeup.title}`.green);
            //await addWriteup(writeup);
          }
        });
      }
    }

    console.log(linkAlive);
  } catch (error) {
    console.log(error);
  }

  // let writeups = await blogParser(blog);

  // if (writeups !== undefined && writeups.length) {
  //   writeups.map(async (writeup, idx) => {
  //     let exists = await checkWriteupExist(writeup.link);

  //     if (exists) {
  //       console.log(`${writeup.title} already exists! Not adding it.`.red);
  //       return;
  //     } else {
  //       console.log(`Adding ${writeup.title}`.green);
  //       //await addWriteup(writeup);
  //     }
  //   });
  // }
}
function iterateWithDelay(params, idx, interval, callback) {
  return setTimeout(async function () {
    callback(params);
  }, idx * interval);
}

function main() {
  RSS_BLOGS.map((RSSBlog, idx) =>
    iterateWithDelay(RSSBlog, idx, 2000, mainCallback)
  );
}

main();

//test();

// async function test(link) {
//   try {
//     const res = await checkLink(link);
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// }
