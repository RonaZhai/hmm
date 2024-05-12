var alice = {
 command: "jail",
 type: "prefix",
 author: "leiamnash",
 restrict: "none",
 cooldown: 20
}

async function leiamnash(leiam) {
  const path = require("path");
  const jimp = require("jimp");
        let base = await jimp.read(path.resolve(__dirname, "..", "alice/assets/jail.png"));
        let img = await jimp.read(leiam);
       const compositeImage = new jimp(400, 400, 0xFFFFFFFF);
        img.resize(400, 400);
        base.resize(400, 400);
        compositeImage.composite(img, 0, 0);
        compositeImage.composite(base, 0, 0);
        return await compositeImage.getBufferAsync(jimp.MIME_PNG);
    
}

async function command({ alice, api, axios, bot, cache, chat, database, event, font, fs, language, log, message, path, scraper, wrapper }) {
try {
  const { createCanvas, loadImage } = require("canvas");
  const leiamA = Object.keys(event.mentions)[0];
 if (!leiamA || !chat) return message(await font(language.mention.replace(/\{(\d+)\}/g, alice.prefix + this.alice.command)), "🗨️");
bot.react("✅", event.messageID, (err) => {}, true);
  const leiamB = path.resolve(__dirname, "..", `alice/cache/affect_${event.senderID}.png`);
  const leiamC = await leiamnash(`https://graph.facebook.com/${leiamA}/picture?width=540&height=540&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
 fs.writeFileSync(leiamB, leiamC);
   return bot.chat({
    attachment: fs.createReadStream(leiamB)
  }, event.threadID, (err) => {
    if (err) return bot.chat(`[ ${this.alice.command} ] » ${language.error}`, event.threadID, event.messageID);
     fs.unlinkSync(leiamB);
  }, event.messageID);
 } catch (error) {
 log.error(`[ ${this.alice.command} ] » ${error}`);
  return bot.chat(`[ ${this.alice.command} ] » ${language.error}`, event.threadID, event.messageID);
 }
}

module["exports"] = {
  alice,
  command
}
