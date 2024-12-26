/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, command, text, args }) => {

if (!text) throw 'nomor/tag!'
let t1 = text.split(' ')
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : t1[0] + '@s.whatsapp.net'
else who = m.sender

    let users = global.db.data.users
    let jumlah = t1[1] ? t1[1] : 0
    users[who].limit -= jumlah * 1
    conn.reply(m.chat, `sukses menghapus limit sebanyak ${t1[1] ? t1[1] : 0} !`, m)
}
handler.help = ['dellimit']
handler.tags = ['owner']
handler.command = /^dellimit(user)?$/i
handler.premium = true

export default handler