import { Telegraf } from "telegraf";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.fields([{ name: "file" }, { name: "chatId" }]);

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
  await runMiddleware(request, response, uploadMiddleware);

  const chatId = request.body.chatId;
  const screenshotBase64 = await request.body.file;
  const screenshotBuffer = Buffer.from(screenshotBase64, "base64");

  await bot.telegram.sendPhoto(chatId, { source: screenshotBuffer });

  return await response.json({ image: "sent" });
};
