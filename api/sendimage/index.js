const { Telegraf } = require("telegraf");
// const { buffer } = require("micro");
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("file");

const bot = new Telegraf(process.env.FAB_BOT_TOKEN);

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

module.exports = async (request, response) => {
  console.log("Incoming image");
  const chatId = request.body.chatId;

  await runMiddleware(request, response, uploadMiddleware);
  const screenshotBuffer = await request.file.buffer;
  console.log(request.file.buffer);
  await bot.telegram.sendPhoto(chatId, { source: screenshotBuffer });
  return await response.json({ image: "sent" });
};
