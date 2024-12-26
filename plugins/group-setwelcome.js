/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, text, isROwner, isOwner }) => {
	if (text) {
		global.db.data.chats[m.chat].sWelcome = text
		m.reply("Succeed");
} else throw "The text?";
};
handler.help = ["setwelcome"];
handler.tags = ["group"];
handler.command = /^setwelcome$/i;

handler.group = true;
handler.admin = true;

export default handler;