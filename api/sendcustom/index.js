const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.FAB_BOT_TOKEN);

module.exports = async (request, response) => {
  console.log("Incoming message", request.body);

  await bot.telegram.sendMessage(request.body.chatId, request.body.message);
  return await response.status(200);
};
