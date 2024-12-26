import { tiktokdl } from '../scraper/tiktokdl.js'

let handler = async (m, { conn, args, usedPrefix, text, command}) => {
let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} https://vm.tiktok.com/ZSL7p9jRV/`
	if (!text) return m.reply(input)
conn.sendMessage(m.chat, {react: {text: '⏱️', key: m.key}})
  tiktokdl(text).then(a => {
    let cap = `乂 *T I K  T O K*\n\n*Quality:* ${a.serverHD.quality}\n*Description:* ${a.caption}`
 conn.sendMessage(m.chat, { video: { url: a.serverHD.url }, caption: cap }, { quoted: m })
  }).catch(e => {
  m.reply(eror)
  })
    conn.sendMessage(m.chat, {react: {text: '✔️', key: m.key}})
    
  }
handler.help = ['tiktokhd <link>']
handler.tags = ['downloader']
handler.command = /^(tiktokhd|tthd)$/i
handler.limit = true
handler.register = true

export default handler