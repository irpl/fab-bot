const { Telegraf } = require("telegraf");
const { buffer } = require("micro");

const bot = new Telegraf(process.env.FAB_BOT_TOKEN);

module.exports = async (request, response) => {
  console.log("Incoming image");

  const screenshotBuffer = await buffer(request);
  await bot.telegram.sendPhoto(request.params.chatId, { source: screenshotBuffer });
  return await response.json({ image: "sent" });
};
