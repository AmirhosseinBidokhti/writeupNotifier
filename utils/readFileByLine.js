const fs = require("fs");

exports.readFileByLine = (path) => {
  try {
    const data = fs.readFileSync(path, "utf-8");

    const lines = data.split("\n");

    return lines;
  } catch (err) {
    throw new Error(`Error reading the file: ${err}`);
  }
};

// Usage e.g
//const blogs = readFileByLine("./blogs/urls.txt");
