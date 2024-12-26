/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fs from 'fs';
import { webcrack } from 'webcrack';

let handler = async (m ,{ conn, text }) => {
	let teks
if (m.quoted) {
 teks = m.quoted ? m.quoted.text : text
} else if (text) {
teks = text ? text : text
} else return m.reply(`[!] Enter the encryption code`)
	try {
		let result = await webcrack(teks);
		m.reply(result.code)
	} catch (e) {
		console.log(e)
		throw "Error: *code invalid!*"
	}
}
handler.help = ["deobfuscator"]
handler.tags = ["tools"]
handler.command = /^(deob(fuscator)?|denc(rypt)?)$/i

handler.premium = true

export default handler