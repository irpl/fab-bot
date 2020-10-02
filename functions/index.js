const Telegraf = require("telegraf");
const moment = require("moment-timezone");
// const mongoose = require("mongoose");
const parse = require("parse-messy-time");
const commandArgsMiddleware = require("./middleware/commandArgs");
require("dotenv").config();

const bot = new Telegraf(process.env.FAB_BOT_TOKEN);

bot.use(commandArgsMiddleware());

// bot.start((ctx) => ctx.reply("Welcome!"));
// bot.help(ctx => ctx.reply("Send me a sticker"));
// bot.on('sticker', (ctx) => ctx.reply('í±'))
// bot.hears("hi", ctx => ctx.reply("Hey there"));

// bot.command("oldschool", ctx => ctx.reply("Hello"));
// bot.command("modern", ({ reply }) => reply("Yo"));
// bot.command("hipster", Telegraf.reply("λ"));

bot.command("day", (ctx) => {
  let firstDate = moment.tz("2019-07-14", "America/Jamaica");

  let secondDate = ctx.state.args.length ? moment.tz(parse(ctx.state.args.join(" ")).toISOString().split("T")[0], "America/Jamaica") : moment.tz("America/Jamaica");

  let diffDays = secondDate.diff(firstDate, "days");

  ctx.reply(`${["brn", "anju", "fil"][diffDays % 3]}'s day`);
});

bot.command("pants", (ctx) => {
  if (ctx.state.args.length) {
    if (ctx.state.args[0] === "on")
      ctx
        .reply("someone's in the house!")
        .then((msg) => ctx.pinChatMessage(ctx.message.chat.id, msg))
        .catch((err) => ctx.reply(err.message));
    else if (ctx.state.args[0] === "off")
      ctx
        .reply("ok, you can come out now")
        .then(() => ctx.unpinChatMessage(ctx.message.chat.id))
        .catch((err) => ctx.reply(err.message));
  } else {
    ctx.reply("/pants requires yes/no arg");
  }
});

// bot.launch()
exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.log(e);
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" };
  }
};
