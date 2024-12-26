/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `Contoh pemakaian: ${usedPrefix}${command} i'm`
    conn.reply(m.chat, `
🪹 ${command} *${text}*
❔ *${text}* *${(101).getRandom()}*% ${command.replace('how', '').toUpperCase()}
  `.trim(), m, m.mentionedJid ? {
        mentions: m.mentionedJid
    } : {})
}
handler.help = ['nigga', 'hitam', 'putih', 'sigma', 'gay', 'pintar', 'cantik', 'ganteng', 'gabut', 'gila', 'lesbi', 'stress', 'bucin', 'jones', 'sadboy'].map(v => 'how' + v + '')
handler.tags = ['primbon']
handler.command = /^how(pintar|cantik|ganteng|gabut|gila|lesbi|stress?|bucin|jones|sadboy|gay|sigma|putih|hitam|nigga)/i

export default handler