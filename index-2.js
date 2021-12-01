// let Parser = require("rss-parser");

// require("dotenv").config({ path: ".env" });
// const { checkWriteup, addWriteup, getAllWriteups } = require("./blogs/write");
// const msgFormatter = require("./utils/msgFormatter");
// const { readFileByLine } = require("./utils/readFileByLine");
// const { sendNotification } = require("./utils/sendNotification");

// let parser = new Parser();

// // const blogs = readFileByLine("./blogs/urls.txt");

// // (async () => {
// //   blogs.map(async (blog) => {
// //     try {
// //let feed = await parser.parseURL(blog);

// //       feed.items.forEach(async (item) => {
// //         console.log(item.title);
// //         console.log(item.link);
// //         console.log(item.pubDate);

// //         const writeUpItem = {
// //           title: item.title,
// //           link: item.link,
// //           pubDate: item.pubDate,
// //         };

// //         const res = await checkWriteup(item.link);
// //         console.log(res);

// //         if (res == false) {
// //           console.log("adding...");
// //           addWriteup(item.title, item.link, item.pubDate);
// //         } else {
// //           console.log("hmm, can't add it");
// //         }

// //         //sendNotification(msgFormatter(writeUpItem));
// //       });
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   });
// // })();

// // fine delay
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// async function fn() {
//   await delay(10000);
// }

// // async function sendAllToTelegarm() {
// //   try {
// //     const allPosts = await getAllWriteups();
// //     allPosts.map(async (post, idx) => {
// //       const writeUpItem = {
// //         title: post.title,
// //         link: post.url,
// //         pubDate: post.pub_date,
// //       };

// //       setTimeout(function () {
// //         console.log(el);
// //       }, index * interval);

// //       await delay(10000);

// //       console.log(`${idx}: ${post.title}`);

// //       //await sendNotification(msgFormatter(writeUpItem));
// //     });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }

// // async function sendAllToTelegarm() {
// //   const INTERVAL = 2800;

// //   try {
// //     const allPosts = await getAllWriteups();
// //     allPosts.map(async (post, idx) => {
// //       const writeUpItem = {
// //         title: post.title,
// //         link: post.url,
// //         pubDate: post.pub_date,
// //       };
// //       setTimeout(async function () {
// //         console.log(`${idx}: ${post.title}`);
// //         await sendNotification(msgFormatter(writeUpItem));
// //       }, idx * INTERVAL);
// //     });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }

// //sendAllToTelegarm();

// //https://stackoverflow.com/questions/8495687/split-array-into-chunks
