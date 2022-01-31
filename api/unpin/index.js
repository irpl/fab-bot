const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.FAB_BOT_TOKEN);

module.exports = async (request, response) => {
  console.log("Incoming message", request.body);

  var res = await bot.telegram.unpinChatMessage(request.body.chatId, request.body.messageId);
  return await response.json(res);
};
