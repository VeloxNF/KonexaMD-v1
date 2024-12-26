/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch'
import {
    webp2png
} from '../lib/webp2mp4.js'

let timeout = 120000
let poin = 4999
let limit = 250
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakingambar = conn.tebakingambar ? conn.tebakingambar : {}
    let id = m.chat
    if (id in conn.tebakingambar) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakingambar[id][0])
        throw false
    }
    let gambar = await (await fetch(global.API('https://raw.githubusercontent.com', '/BochilTeam/database/master/games/tebakgambar.json'))).json()
    let json = gambar[Math.floor(Math.random() * gambar.length)]
      
    let caption = `*${command.toUpperCase()}*
Rangkailah Gambar Ini
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hgam untuk bantuan
Bonus: ${poin} XP
    `.trim()
   // let imgurl = await imageUrl(json.img)
    conn.tebakingambar[id] = [
        
        await conn.sendMessage(m.chat, {image: {url: json.img}, caption: caption}, {quoted: m}),
        json, poin, limit,
        setTimeout(() => {
            if (conn.tebakingambar[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakingambar[id][0])
            delete conn.tebakingambar[id]
        }, timeout)
    ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i

export default handler

async function imageUrl(url) {
  try {
    let Blobs = await(await fetch(url)).blob()
let arrayBuffer = await Blobs.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);
  let pngBuffer = await webp2png(buffer);
  return pngBuffer
  } catch (error) {
    console.error("Error:", error);
  }
}