/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import { WattPad } from '../scraper/scrape-search.js'

let handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) throw `[❗] Input query\n*${usedPrefix+command} roman*`
  let anu = await WattPad(text);
  anu = anu.map((v) => `*Title:* ${v.title}\n*Reads:* ${v.reads}\n*Vote:* ${v.vote}\n*Chapter:* ${v.chapter}\n*Link:* ${v.link}\nDescription:* ${v.desc}`).join`\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n`
  conn.sendFile(m.chat, anu[0].thumb || emror, '', anu, m)
}
handler.help = ['wattpad']
handler.tags = ['internet']
handler.command = /^(wattpad)$/i
handler.limit = true

export default handler