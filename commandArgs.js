const commandArgs = () => (ctx, next) => {
  // console.log(ctx.updateSubTypes);
  // if (ctx.updateType === "message" && ctx.updateSubTypes[0] === "text") {
  if (ctx.updateType === "message") {
    const text = ctx.update.message.text.toLowerCase();
    if (text.startsWith("/")) {
      const match = text.match(/^\/([^\s]+)\s?(.+)?/);
      let args = [];
      let command;
      if (match !== null) {
        if (match[1]) {
          command = match[1];
        }
        if (match[2]) {
          args = match[2].split(" ");
        }
      }

      ctx.state = {
        raw: text,
        command,
        args,
      };
    }
  }
  return next();
};

module.exports = commandArgs;
