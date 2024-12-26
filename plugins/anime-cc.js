/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from 'axios'
let handler = async(m, { conn, usedPrefix, command }) => {
let ccanime = (await axios.get(`https://raw.githubusercontent.com/ClayzaAubert/library/main/media/cosplayercina.json`)).data  
let cc = await ccanime[Math.floor(ccanime.length * Math.random())]
conn.sendFile(m.chat, cc, 'error.jpg', `*ekhmmmm😋*`, m)}
//conn.sendButton(m.chat, "*Siiiuuuuuu*", author, ronaldo, [['⚽ NEXT ⚽', `${usedPrefix + command}`]], m)}
handler.help = ['ccanime']
handler.tags = ['anime']
handler.command = /^(cc|ccanime)$/i
export default handler