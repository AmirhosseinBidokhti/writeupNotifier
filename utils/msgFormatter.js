function msgFormatter(msg) {
  // msg.link, msg.title, msg.pubDate

  const eye = encodeURIComponent("👀");
  const link = encodeURIComponent("🔗");
  const date = encodeURIComponent("📆");

  let message = [
    `${eye} ${encodeURIComponent(msg.title)}`,
    `${link} ${msg.link}`,
    `${date} ${msg.pubDate}`,
  ].join("\n");

  return message;
}

module.exports = msgFormatter;
