const axios = require("axios");

async function checkLink(link) {
  try {
    const response = await axios.get(link);

    if (response) {
      return { link, status: response.status };
    }
  } catch (error) {
    //console.log(error);
    //console.log(typeof error);
    if (error.code !== "ECONNRESET" || error.code !== "ETIMEDOUT") {
      return { link, status: error.response.status };
    }
  }
}

//blogs.map((blog) => checkLink(blog));

module.exports = checkLink;

// errorTypeError: Cannot read property 'status' of undefined
// at checkLink (D:\Bug Hunting\custom tool\writeupNo

// ETIMEDOUT
// this error mostly is caused by the connection issue and the error is something different. what to do with connection?
