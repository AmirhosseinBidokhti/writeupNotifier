const axios = require("axios");

//not working when importing the function to index
//require("dotenv").config({ path: "../.env" });
require("dotenv").config();

const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const sendNotification = (writeup) => {
  const sendUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHANNEL_ID}&text=${writeup}`;

  axios
    .get(sendUrl)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};
sendNotification("testt");

exports.sendNotification = sendNotification;
//sendNotification("hey this is a message by jacquelyn bot");
