/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch'

const link = 'https://data.bmkg.go.id/DataMKG/TEWS/'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
let setting = db.data.settings[conn.user.jid]
let type = (args[0] || '').toLowerCase()

switch (type) {
case 'update':
if (args[1] == 'on') {
setting.update_gempa = true
m.reply('auto update gempa *ON*')
} else if (args[1] == 'off') {
setting.update_gempa = false
m.reply('auto update gempa *OFF*')
} else m.reply('swich ON/OFF')
break
default:
	try {
		let res = await fetch(link+'autogempa.json')
		let anu = await res.json()
		anu = anu.Infogempa.gempa
		let txt = `*${anu.Wilayah}*\n\n`
		txt += `Tanggal : ${anu.Tanggal}\n`
		txt += `Waktu : ${anu.Jam}\n`
		txt += `Potensi : *${anu.Potensi}*\n\n`
		txt += `Magnitude : ${anu.Magnitude}\n`
		txt += `Kedalaman : ${anu.Kedalaman}\n`
		txt += `Koordinat : ${anu.Coordinates}${anu.Dirasakan.length > 3 ? `\nDirasakan : ${anu.Dirasakan}` : ''}`
		await conn.sendMessage(m.chat, {text: txt , contextInfo:
					{
						"externalAdReply": {
							"title": namebot,
							"body": command,
							"showAdAttribution": true,
							"mediaType": 1,
							"sourceUrl": '',
							"thumbnailUrl": gempaUrl,
							"renderLargerThumbnail": true
														

						}
					}}, { quoted: m })
	} catch (e) {
			console.log(e)
			m.reply(`[!] Fitur Error.`)
		}
	}
}

handler.help = ['gempa']
handler.tags = ['internet']
handler.command = /^(gempa)$/i

handler.premium = false
handler.limit = true

export default handler