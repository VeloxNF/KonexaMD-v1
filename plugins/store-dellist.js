let handler = async (m, { text, usedPrefix, command }) => {
	if (!text) throw "Gunakan *" + usedPrefix + "liststore* Untuk Melihat Daftar Store Yang Tersimpan."
	if (!global.db.data.chats[m.chat].list) global.db.data.chats[m.chat].list = []
	let msgs = global.db.data.chats[m.chat].list
	if (!(text in msgs)) throw "[ " + text + " ] Tidak Terdaftar Di Daftar List."
	delete msgs[text]
 throw "Berhasil Menghapus Pesan Di Daftar List Dengan Nama >\n" + text
}
handler.help = ["delstore"]
handler.tags = ["owner"]
handler.command = ["delstore"]
handler.group = handler.admin = true
export default handler