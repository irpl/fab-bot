const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.FAB_BOT_TOKEN);

module.exports = async (request, response) => {
  console.log("Incoming message", request.body);

  return await bot.telegram.sendMessage(request.body.chatId, request.body.message).then((rv) => {
    // if it's not a request from the telegram, rv will be undefined, but we should respond with 200
    return !rv && response.status(200);
  });
};
