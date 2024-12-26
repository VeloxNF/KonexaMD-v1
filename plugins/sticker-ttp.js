import { sticker } from '../lib/sticker.js'
import { ttp } from '../scraper/ttp.js'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} Pagi sayang
or
${usedPrefix + command} reply teks`

	if (!text) return m.reply(input)
	let stiker = false
	let api = await ttp(text)
stiker = await sticker(false, api[0].url, packname, author)
conn.sendFile(m.chat, stiker, 's.webp', m)
}
handler.help = ['ttp']
handler.tags = ['sticker']
handler.command = /^(ttp)$/i

export default handler