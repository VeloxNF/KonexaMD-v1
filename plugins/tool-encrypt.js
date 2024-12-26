/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fs from 'fs'
import JavaScriptObfuscator from 'javascript-obfuscator'
import { obfus } from '../scraper/encrypt.js'

let handler = async (m, { text, usedPrefix, command }) => {


let tex = m.quoted ? m.quoted.text : text
if (!tex) throw 'reply atau kirim teksnya'
try {
				let meg = await obfus(tex)
				let nem = './tmp/result.js'
                let enc = meg.author + meg.result
				await fs.writeFileSync(nem, enc)
			let t4 = await fs.readFileSync('./tmp/result.js')
				m.reply(enc)	
conn.sendMessage(m.chat, {
					document: t4,
					mimetype: 'document/application',
					fileName: 'result_enc.js',
					fileLength: 2023
				}, {
					quoted: m
				})
} catch (e) {
throw eror
}
}
handler.help = ['enc']
handler.tags = ['owner']
handler.command = /^(enc)$/i
handler.register = true
handler.limit = true


export default handler