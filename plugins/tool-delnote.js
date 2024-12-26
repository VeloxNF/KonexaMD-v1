let handler = async (m, {
    conn,
    command,
    usedPrefix,
    text
}) => {

    if (global.db.data.users[m.sender].catatan.length == 0) return m.reply("Kamu belum punya catatan!")
    let catatan = global.db.data.users[m.sender].catatan
    if (catatan.length == 0) return m.reply("Kamu belum memiliki catatan!")

if (text) {
if (isNaN(text)) return m.reply('harus angka bang')
let note = global.db.data.users[m.sender].catatan
let fix = text * 1
let nom =  fix - 1
await conn.reply(m.chat, `Sukses menghapus catatan:
*Title: ${note[nom].title}*`, m)
note.splice(nom, 1)
} else {
    let num = 1
    let txt = 'List catatan\n\N'
    for (let note of catatan) {
        txt += `${num++}.*${note.title}*\n`
    }
       txt += '\nKetik: .delnote (nomor)'
    await conn.reply(m.chat, txt, m)
}
}

handler.help = ["listnote"]
handler.tags = ["tools"]
handler.command = /^(hapus(note|catatan)|deletenote)$/i

export default handler