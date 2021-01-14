const { Telegraf } = require("telegraf");
const moment = require("moment-timezone");
const mongoose = require("mongoose");
const parse = require("parse-messy-time");
const commandArgsMiddleware = require("./commandArgs");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(commandArgsMiddleware());

const Minder = mongoose.model("Minder", {
  text: String,
  who: String,
  id: String,
  created: { type: String, default: Date.now },
});

// bot.start(ctx => ctx.reply("Welcome!"));
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

bot.command("minders", async (ctx) => {
  try {
    await mongoose.connect(process.env.FAB_BOT_MONGO, {
      useNewUrlParser: true,
    });
    let messages = await Minder.find({
      id: ctx.message.chat.id,
      who: ctx.message.from.id,
    }).sort({ created: -1 });
    messages.map((message) => ctx.reply(message.text));
  } catch (err) {
    ctx.reply(err.message);
  }
});

bot.command("mindme", async (ctx) => {
  try {
    await mongoose.connect(process.env.FAB_BOT_MONGO, {
      useNewUrlParser: true,
    });

    const minder = await new Minder({
      text: ctx.state.args.join(" "),
      who: ctx.message.from.id,
      id: ctx.message.chat.id,
    });

    await minder.save();
    await ctx.reply("did");
  } catch (err) {
    ctx.reply(err.message);
  }
});

bot.telegram.setWebhook("https://filanjuanbrn.herokuapp.com/secret-path");
// bot.telegram.setWebhook("http://localhost/secret-path");

bot.startWebhook("/secret-path", null, process.env.PORT || 5000);
