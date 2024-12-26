/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Kalau lu nemuin bug/mau request bisa segera lapor ke owner\n\nContoh:\n${usedPrefix + command} Anu bang gw nemuin bug/error <copy/reply pesan erornya>`
    if (text.length < 10) throw `Jangan pendek bgt lah bang :!`
    if (text.length > 1000) throw `Buset lu lapor apa cerita -_`
   let tex = m.quoted ? m.quoted.text : '￴ ￴ ￴ ￴ ￴'
    let teks = `*${tex}*\n\nDari : *@${m.sender.split`@`[0]}*\n\nPesan : ${text}\n`
    conn.sendText(nomerown + '@s.whatsapp.net', teks)
    conn.sendText(m.chat, `Sabar bang, laporan udah terkirim ke owner
 _Jangan buat maenan ya banh_`)
}
handler.help = ['report', 'request']
handler.tags = ['main']
handler.command = /^(report|request)$/i
export default handler