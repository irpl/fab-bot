const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.FAB_BOT_TOKEN);

module.exports = async (request, response) => {
  console.log("Incoming message", request.body);

  var res = await bot.telegram.sendMessage(request.body.chatId, request.body.message);

  request.body.pin && (await bot.telegram.pinChatMessage(request.body.chatId, res.message_id));
  return await response.json(res);
};
