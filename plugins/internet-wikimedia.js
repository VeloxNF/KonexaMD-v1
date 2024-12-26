/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import { WikiMedia } from '../scraper/scrape-search.js'

let handler = async(m, { conn, text }) => {
  if (!text) throw `Mau Cari Apa?`
  let anu = await WikiMedia(text);
  anu = anu.map((v) => `*Title:* ${v.title}\n*Source:* ${v.source}\n*Image:* ${v.image}`).join`\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n`
  conn.sendFile(m.chat, anu[0].image || emror, '', anu, m)
}
handler.help = ['wikimedia']
handler.tags = ['internet']
handler.command = /^(wikimedia)$/i
handler.limit = true

export default handler