const axios = require("axios");

const colors = require("colors");

require("dotenv").config();

const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const sendNotification = (writeup) => {
  const sendUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHANNEL_ID}&text=${writeup}`;
  return new Promise((resolve, reject) => {
    axios
      .get(sendUrl)
      .then((res) => {
        console.log(`[+] Sending the writeup to Telegram`.blue);
        resolve(res.data);
      })
      .catch((err) => {
        console.log(
          "[-]: Error while sending writeup to Telegram: ".red + err.message
        );
        reject(err.message);
      });
  });
};

exports.sendNotification = sendNotification;
