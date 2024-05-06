const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
	name: "img4",
	version: "6.9",
	credits: "dipto",
	role: 0,
	hasPrefix: false,
	description: "Generate images by sdxl",
	usage: "text",
	cooldown: 5,
	aliases: ["image"]
};

module.exports.run = async function ({ api, event, args }) {
	const prompt = args.join(" ");
	const w = await api.sendMessage("Please wait...", event.threadID);
	const url = `https://all-image-genator-d1p.onrender.com/dipto/sdxl?prompt=${encodeURIComponent(prompt)}`;
	try {
		const response = await axios.get(url);
		const imageUrls = response.data.imageUrls;
		const imgPaths = [];
		for (let i = 0; i < imageUrls.length; i++) {
			const imgUrl = imageUrls[i];
			const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
			await fs.outputFile(imgPath, imgResponse.data);
			imgPaths.push(imgPath);}
		await api.unsendMessage(w.messageID);
		await api.sendMessage({
			body: `🥵 | Here's your images`,
			attachment: imgPaths.map(imgPath => fs.createReadStream(imgPath))
		}, event.threadID, event.messageID);
 imgPaths.forEach(imgPath => fs.unlink(imgPath));
	} catch (error) {
		console.error(error);
		await api.sendMessage(`Generation failed!\nError: ${error.message}`, event.threadID, event.messageID);
	}
};
