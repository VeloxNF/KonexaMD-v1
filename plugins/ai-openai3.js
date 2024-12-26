import fetch from "node-fetch"
const handler = async (m, { text, usedPrefix, command }) => {
	try {
		if (!text) return m.reply("ada yang bisa gw bantu atau cuma mau nyepam aja? ðŸ˜’ðŸ’…");
		await fetch(
			`https://nue-api.vercel.app/api/alicia?text=${text}&user=KiiCode`,
		)
			.then((result) => result.json())
			.then((x) => m.reply(x.result));
	} catch (e) {
		m.reply(eror);
	}
};
handler.help = handler.command = ["ai3","openai3"];
handler.tags = ["ai"];

export default handler