/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	let stiker = false
		let q = m.quoted ? m.quoted : m
		let mime = (q.msg || q).mimetype || q.mediaType || ''
if (!mime) return m.reply(`Kirim/reply gambar Dengan caption
${usedPrefix + command}`)
			let img = await q.download?.()
			let link = await uploadImage(img)
			
			let data = {
    "h": "1080",
    "w": "1080",
    "a.tp": "image",
    "a.x": "533",
    "a.y": "545",
    "a.w": "400",
    "a.h": "400",
    "a.sx": "2.61",
    "a.sy": "2.61",
    "a.rx": "300",
    "a.ry": "300",
    "a.src": link
} 

// Generate apiURL from data
let api = 'https://img.bruzu.com/?'+new URLSearchParams(data).toString();

		stiker = await sticker(false, api, packname, author)
conn.sendFile(m.chat, stiker, 's.webp', m)
}
handler.help = ['scircle']
handler.tags = ['sticker']
handler.command = /^(scircle|scir)$/i

export default handler