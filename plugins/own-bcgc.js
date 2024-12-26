/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import moment from 'moment-timezone'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { participants, conn, isOwner, isROwner, text }) => {
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    //batas
    
let api = "https://telegra.ph/file/98f82ae5ad3c9b175c1e1.jpg"

    
    const delay = time => new Promise(res => setTimeout(res, time))
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let anu = groups.map(v => v.id)
    let pesan = text ? text : m.quoted ? m.quoted.text : '';
    let bc = `\n` + pesan + `\n\n` + await style(namebot, 5)
    if(!pesan) throw 'teksnya?'
    m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai Dalam ${anu.length * 0.5} Detik`)
    if (m.quoted) {
    if (m.quoted.mtype == 'imageMessage') {
            let foto = await uploadImage(await m.quoted.download())
            
        for (let i of anu) {
                    let parti = (await conn.groupMetadata(i)).participants.map(a => a.id)
                    
     conn.sendMessage(i, {image: {url: foto}, caption: bc, contextInfo: 
					{
					                    
						"externalAdReply": {
							"title": `📣  [ ʙ ʀ ᴏ ᴀ ᴅ ᴄ ᴀ s ᴛ ]  📣`,
							"body": 'WhatsApp Bot MD ',
							"showAdAttribution": true,
							"previewType": "PHOTO",
							"sourceUrl": sgc,
							"thumbnailUrl": logo

						}
					}}, {quoted: fkon}
					)
					await conn.delay(1500)
					}
					} else if (m.quoted.mtype === 'extendedTextMessage') {
					    for (let i of anu) {
					        let parti = (await conn.groupMetadata(i)).participants.map(a => a.id)
					        
  conn.sendMessage(i, {text: bc, contextInfo: 
					{
					  mentionedJid: parti,
						"externalAdReply": {
							"title": `📣  [ ʙ ʀ ᴏ ᴀ ᴅ ᴄ ᴀ s ᴛ ]  📣`,
							"body": 'WhatsApp Bot MD ',
							"showAdAttribution": true,
							"mediaType": 1,
							"sourceUrl": sgc,
							"thumbnailUrl": api,
							"renderLargerThumbnail": true

						}
					}}, {quoted: fkon}
					)
								await conn.delay(1500)
								
    }
    }
    } else {
					    for (let i of anu) {
					       let parti = (await conn.groupMetadata(i)).participants.map(a => a.id)

					        
  conn.sendMessage(i, {text: bc, contextInfo: 
					{
					    mentionedJid : parti,               
						"externalAdReply": {
							"title": `📣  [ ʙ ʀ ᴏ ᴀ ᴅ ᴄ ᴀ s ᴛ ]  📣`,
							"body": 'WhatsApp Bot MD ',
							"showAdAttribution": true,
							"mediaType": 1,
							"sourceUrl": sgc,
							"thumbnailUrl": api,
							"renderLargerThumbnail": true

						}
					}}, {quoted: fkon}
					)
										await conn.delay(1500)
										
    }
    }
  m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.help = ['bcgc']
handler.tags = ['owner']
handler.command = /^(broadcastgc|bcgc)$/i

handler.owner = true
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)]
  }

export default handler