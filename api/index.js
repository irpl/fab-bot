const { Telegraf } = require("telegraf");
const parse = require("parse-messy-time");
const moment = require("moment-timezone");
const commandArgsMiddleware = require("./commandArgs");

if (process.env.VERCEL_ENV != "production") {
  require("dotenv").config();
}

const bot = new Telegraf(process.env.FAB_BOT_TOKEN, {
  telegram: { webhookReply: true },
});

// error handling
bot.catch((err, ctx) => {
  console.error("[Bot] Error", err);
  return ctx.reply(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.use(commandArgsMiddleware());

bot.command("day", (ctx) => {
  let firstDate = moment.tz("2019-07-14", "America/Jamaica");

  let secondDate = ctx.state.args.length ? moment.tz(parse(ctx.state.args.join(" ")).toISOString().split("T")[0], "America/Jamaica") : moment.tz("America/Jamaica");

  let diffDays = secondDate.diff(firstDate, "days");

  return ctx.reply(`${["brn", "anju", "fil"][diffDays % 3]}'s day`);
});

bot.command("pants", (ctx) => {
  if (ctx.state.args.length) {
    if (ctx.state.args[0] === "on")
      return ctx
        .reply("someone's in the house!")
        .then((msg) => ctx.pinChatMessage(ctx.message.chat.id, msg))
        .catch((err) => ctx.reply(err.message));
    else if (ctx.state.args[0] === "off")
      return ctx
        .reply("ok, you can come out now")
        .then(() => ctx.unpinChatMessage(ctx.message.chat.id))
        .catch((err) => ctx.reply(err.message));
  } else {
    return ctx.reply("/pants requires yes/no arg");
  }
});

// handle all telegram updates with HTTPs trigger
module.exports = {
  handleUpdates: async (request, response) => {
    console.log("Incoming message", request.body);
    return await bot.handleUpdate(request.body, response).then((rv) => {
      // if it's not a request from the telegram, rv will be undefined, but we should respond with 200
      return !rv && response.status(200);
    });
  },
};
