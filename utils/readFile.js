import fs from "fs";

export const readFile = (path) => {
  try {
    const data = fs.readFileSync(path, "utf-8");
    console.log(data);
  } catch (err) {
    throw new Error(`Error reading the file: ${err}`);
  }
};
