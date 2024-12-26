const {
    proto
} = (await import("@adiwajshing/baileys")).default

let handler = async (m, {
    conn,
    text,
    command,
    usedPrefix
}) => {
    let M = proto.WebMessageInfo;
    if (!m.quoted) throw "Balas Pesan Dengan Perintah *" + usedPrefix + command + "*";
    if (!text) throw "Penggunaan: " + usedPrefix + command + " <teks>\n\nContoh:\n" + usedPrefix + command + " tes";
    if (!global.db.data.chats[m.chat].list) global.db.data.chats[m.chat].list = {}
    let msgs = global.db.data.chats[m.chat].list
    if (!text in msgs) throw "[ " + text + " ] Tidak Terdaftar Di List Store"
    msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON()
    return m.reply("Berhasil Update " + text + " Ke List Store.\n\nAkses Dengan Mengetik Namanya")
}
handler.help = ["updatestore"]
handler.tags = ["store"]
handler.command = ["updatestore"]
handler.group = handler.admin = true
export default handler