/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import yts from 'yt-search'
import fs from 'fs'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*${usedPrefix + command} Music*`
    let results = await yts(text);
    let teks = results.all.map((v, i) => {
      let link = v.url;
      return `[${i + 1}] ${v.title}
↳  *_Link :_* ${v.url}
↳  *_Durasi :_* ${v.timestamp}
↳ *_Diunggah :_* ${v.ago}
↳  *_Ditonton :_* ${v.views}`
    }).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');
    conn.sendFile(m.chat, results.all[0].thumbnail, 'yts.jpeg', teks, m);
}
handler.help = ['playlist *<teks>*'];
handler.tags = ['internet'];
handler.command = /^playlist|playlist$/i;
export default handler