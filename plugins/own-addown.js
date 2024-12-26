/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/


let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.sender
    let user = db.data.users[who]
    if (!who) throw `Tag orang nya bang!`
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw `Tentukan jumlah hari !`
    if (isNaN(txt)) return m.reply(`Hanya Nomor!\n\nExample:\n${usedPrefix + command} @${m.sender.split`@`[0]} 7`)
    var jumlahHari = 86400000 * txt
    var now = new Date() * 1
    if (now < user.ownerTime) user.ownerTime += jumlahHari
    else user.ownerTime = now + jumlahHari
user.owner = true
    m.reply(`Success
*Nama:* ${user.name}
*Selama:* ${txt} Hari`)
}
handler.help = ['addown']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)o(wner)?$/i

handler.group = false
handler.rowner = true

export default handler