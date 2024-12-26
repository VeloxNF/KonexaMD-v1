/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, text, isROwner, isOwner }) => {
	if (text) {
		db.data.chats[m.chat].sBye = text
		m.reply("Succeed");
	} else throw "the text?";
};
handler.help = ["setbye"];
handler.tags = ["group"];
handler.command = /^setbye$/i;
handler.group = true;
handler.admin = true;

export default handler;