/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, command, text }) => conn.reply(m.chat, `
◦ *Pertanyaan:* ${command} ${text}
◦ *Jawaban:* ${(10).getRandom()} ${['detik', 'menit', 'jam', 'hari', 'minggu', 'bulan', 'tahun', 'dekade', 'abad'].getRandom()} lagi ...
  `.trim(), m, m.mentionedJid ? {
    mentions: m.mentionedJid
} : {})

handler.help = ['', 'kah'].map(v => 'kapan' + v + '')
handler.tags = ['primbon']
// handler.customPrefix = /(\?$)/
handler.command = /^kapan(kah)?$/i

export default handler