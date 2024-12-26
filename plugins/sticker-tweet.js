/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} Pagi sayang
or
${usedPrefix + command} reply teks`

let teks = m.quoted ? m.quoted.text : text
	if (!teks) return m.reply(input)
	let stiker = false
			let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/3Fh9V6p/avatar-contact.png')
			let data = {
    "bi": "https://source.unsplash.com/eICUFSeirc0/1200x630",
    "bi.o": "isNan",
    "h": "630",
    "w": "1200",
    "a.tp": "rect",
    "a.ox": "center",
    "a.oy": "center",
    "a.x": "600",
    "a.y": "315",
    "a.w": "1024",
    "a.h": "380",
    "a.fill": "white",
    "a.sc": "gray",
    "a.o": "0.8",
    "a.rx": "20",
    "a.ry": "20",
    "b.tp": "textbox",
    "b.ox": "center",
    "b.oy": "center",
    "b.x": "600",
    "b.y": "388",
    "b.w": "905",
    "b.h": "149",
    "b.ta": "left",
    "b.fs": "44",
    "b.lh": "1",
    "b.fw": "400",
    "b.ff": "Inter",
    "b.fontStyle": "normal",
    "b.maxHeight": "150",
    "c.tp": "textbox",
    "c.ox": "center",
    "c.oy": "bottom",
    "c.x": "484",
    "c.y": "223",
    "c.w": "438",
    "c.h": "40",
    "c.fill": "#000000",
    "c.t": m.name,
    "c.ta": "left",
    "c.fs": "35",
    "c.lh": "1",
    "c.fw": "400",
    "c.ff": "Poppins",
    "c.fontStyle": "normal",
    "c.maxHeight": "35",
    "d.tp": "image",
    "d.x": "147",
    "d.y": "181",
    "d.w": "200",
    "d.h": "200",
    "d.sx": "0.5",
    "d.sy": "0.5",
    "d.ox": "left",
    "d.oy": "top",
    "d.circleFrame": "true",
    "e.tp": "textbox",
    "e.ox": "center",
    "e.oy": "bottom",
    "e.x": "484",
    "e.y": "260",
    "e.w": "438",
    "e.h": "29",
    "e.fill": "#806b6b",
    "e.ta": "left",
    "e.fs": "26",
    "e.lh": "1",
    "e.fw": "400",
    "e.ff": "Open Sans",
    "e.fontStyle": "normal",
    "e.maxHeight": "26",
    "f.tp": "image",
    "f.x": "983",
    "f.y": "183",
    "f.w": "397",
    "f.h": "321",
    "f.sx": "0.2",
    "f.sy": "0.2",
    "f.ox": "left",
    "f.oy": "top",
    "f.src": "https://i.imgur.com/sT9QS7U.png",
    "d.src": pp,
    "b.t": teks,
    "e.t": "@" + m.name
} 

// Generate apiURL from data
let api = 'https://img.bruzu.com/?'+new URLSearchParams(data).toString();


		stiker = await sticker(false, api, packname, author)
conn.sendFile(m.chat, stiker, 's.webp', m)
}
handler.help = ['stweeter']
handler.tags = ['sticker']
handler.command = /^(stweet|stweeter)$/i

export default handler