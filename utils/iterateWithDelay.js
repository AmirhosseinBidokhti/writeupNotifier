function iterateWithDelay(params, idx, interval, callback) {
  return setTimeout(function () {
    callback(params);
  }, idx * interval);
}

module.exports = iterateWithDelay;
