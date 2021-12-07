const Parser = require("rss-parser");

// Parse a blog rss and return an array of all new posts
// [{title, link, pubdate}]

async function blogParser(url) {
  let parser = new Parser();
  let writeups = [];
  try {
    let { items } = await parser.parseURL(url);

    items.map(({ title, link, pubDate }) => {
      writeups.push({
        title,
        link,
        pubDate,
      });
    });
    return writeups;
  } catch (error) {
    console.log(`Error while parsing: ${error.message}`);
  }
}

module.exports = blogParser;
