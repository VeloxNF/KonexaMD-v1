/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import { RingTone } from '../scraper/scrape-search.js'

let handler = async (m, { args, conn, text, usedPrefix , command }) => {
let teks1 = text.split('|')[0]
let teks2 = text.split('|')[1]

if (teks1 == 'search') {
if (!teks2) return m.reply(`[❗] input query\n*${usedPrefix+command} vivo*`)
let no = 1
// result
let result = await RingTone(teks2);

result = result.map(v => `
${no++}. *Title*: ${v.title}
   *Sumber*: ${v.source}
   *Audio*: ${v.audio}`).join`\n\n•───────────────────•\n\n`
   
 m.reply(result)
} else if (teks1 == 'dl') {
if (!teks2) return m.reply(`[❗] input link\n*${usedPrefix+command} https://btones.b-cdn.net/fetch/27/276bc3df59a4c5b922c3555b9726a1df.mp3`)
if (!(teks2.includes('https://btones.b-cdn.net'))) return m.reply('📣 Link not support')
try {
conn.sendFile(m.chat, teks2, '', null, m)
} catch (e) {
m.reply(eror + ': ' + e)
}
} else return m.reply(`pilih dibawah:
 • search
 • dl
 
 example: *${usedPrefix+command} search vivo*
 `)
}
handler.help = ['dl', 'search'].map(v => `ringtone ${v}`)
handler.tags = ['downloader']
handler.command = /^(ringtone)$/i
handler.limit = true
handler.register = true

export default handler