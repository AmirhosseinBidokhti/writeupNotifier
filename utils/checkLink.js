const axios = require("axios");
const colors = require("colors");
const dns = require("dns");
const { resolve } = require("path");

async function checkLink(link) {
  try {
    const response = await axios.get(link);

    if (response) {
      return { link, status: response.status };
    }
  } catch (error) {
    if (error.code !== "ECONNRESET" || error.code !== "ETIMEDOUT") {
      return { link, status: error.response.status };
    }
  }
}

function checkLinkDNS(domains) {
  return new Promise((resolve, reject) => {
    const liveLinks = [];
    const promises = [];

    domains.forEach((domain) => {
      let validDomain = new URL(domain).origin;

      const path = new URL(domain).pathname;

      validDomain = validDomain.replace(/(^\w+:|^)\/\//, "");

      promises.push(
        new Promise((resolve, reject) => {
          dns.resolve(validDomain, function (err, ip) {
            console.log(
              `[+]: Live or down check for ${validDomain.underline.bold}`
            );
            return resolve({ domain: `https://${validDomain}${path}`, ip: ip });
          });
        })
      );
    });
    // after all of the DNS queries have completed, log the results
    Promise.all(promises)
      .then(function (results) {
        results.forEach((result) => {
          if (!!result.ip) {
            liveLinks.push(result.domain);
          }
        });
      })
      .then(() => {
        console.log("[+]: Finished checking for live links.".green);
        console.log("[+]: Number of live Links: ".green + liveLinks.length);
        console.log(
          "[+]: Number of down Links: ".red +
            (domains.length - liveLinks.length)
        );
        resolve(liveLinks);
      });
  });
}

module.exports = { checkLink, checkLinkDNS };
