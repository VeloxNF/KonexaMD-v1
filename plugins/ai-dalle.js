/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, {text, conn, usedPrefix, command}) => {
try {

if (!text) return conn.reply(m.chat, `Masukan prompt!`, m)

conn.sendMessage(m.chat, {react: {text: '⏱️', key: m.key}})

// function json 
let result = (`https://aemt.me/dalle?text=${text}`)

// sending_ file
conn.sendFile(m.chat, result || emror, 'error.jpg', `📣 *Result from ${usedPrefix+command} ${text}*`, m)

conn.sendMessage(m.chat, {react: {text: '📢', key: m.key}})
} catch (e) {
console.log(`${global.eror} : ${e}`)
m.reply(`${global.eror} : ${e}`)
conn.sendMessage(m.chat, {react: {text: '✖️', key: m.key}})

}

}
handler.help = handler.command = ['dalle']
handler.tags = ['ai']
handler.premium = true
handler.register = true

export default handler