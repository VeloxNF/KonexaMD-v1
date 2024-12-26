let handler = async (m, { text }) => {
	if (!text) throw "the text?";

	await conn.groupUpdateDescription(m.chat, text);
	return m.reply("Succeed.");
};

handler.help = ["setdesc", "sdesc"];
handler.tags = ["group"];
handler.command = /^(setdesc|sdesc)$/i;

handler.group = true;
handler.admin = true;

export default handler;
