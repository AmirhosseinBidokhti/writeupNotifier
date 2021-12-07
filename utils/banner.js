var figlet = require("figlet");
const banner = () => {
  figlet("writeupNotifier", function (err, data) {
    if (err) {
      console.log("Something went wrong with the banner...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
};

module.exports = banner;
