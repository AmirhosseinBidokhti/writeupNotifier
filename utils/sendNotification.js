const axios = require("axios");

//not working when importing the function to index
//require("dotenv").config({ path: "../.env" });
require("dotenv").config();

const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendNotification = (writeup) => {
  const sendUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHANNEL_ID}&text=${writeup}`;
  return new Promise((resolve, reject) => {
    axios
      .get(sendUrl)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.message));
  });
};

exports.sendNotification = sendNotification;
//sendNotification("hey this is a message by jacquelyn bot");
