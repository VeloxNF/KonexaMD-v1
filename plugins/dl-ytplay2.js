import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper-sosmed'
let limit = 100

let handler = async (m, { conn, text, usedPrefix, command }) => {
  
    let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} dj mengkane`
	if (!text) return m.reply(input)
  let res = await yts(text)
  //let vid = res.all.find(video => video.seconds < 3600)
  let vid = res.videos[0]
  if (!vid) throw `✳️ Video/Audio Tidak Ditemukan`
  let isVideo = /vid$/.test(command)
  
  try {
    let chat = global.db.data.chats[m.chat]
    
  let q = isVideo ? '360p' : '128kbps' 
  let v = vid.url
  let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
  let dl_url = await (isVideo ? yt.video[q].download() : yt.audio[q].download())
  let title = await yt.title
  let size = await (isVideo ? yt.video[q].fileSizeH : yt.audio[q].fileSizeH)
  let play = `  乂 *P L A Y  M U S I C*
  
    ᨔ   *Titel* : ${vid.title}
    ᨔ   *Diterbitkan:* ${vid.ago}
    ᨔ   *Durasi:* ${vid.timestamp}
    ᨔ   *Dilihat:* ${vid.views}

_Sending..._`

conn.sendMessage(m.chat, {
text: play,
contextInfo: {
externalAdReply: {
title: namebot,
body: '',
thumbnailUrl: vid.thumbnail,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: true
}}})

if (size.split('MB')[0] >= limit) return m.reply(` ≡  *PLAY YTDL*\n\n▢ *⚖️Size* : ${size}\n▢ *🎞️Kualitas* : ${text}\n\n▢ _File melebihi batas unduhan_ *+${limit} MB*`) 
if (size.includes('GB')) return m.reply(` ≡  *PLAY YTDL*\n\n▢ *⚖️Size* : ${size}\n▢ *🎞️Kualitas* : ${q}\n\n▢ _File melebihi batas unduhan_ *+${limit} MB*`)   
	  conn.sendFile(m.chat, dl_url, title + '.mp' + (3 + /vid$/.test(command)), `
 ≡  *PLAY YTDL*
  
▢ *📌Titel* : ${title}
▢ *🎞️Kualitas* : ${q}
▢ *⚖️Size* : ${size}
`.trim(), m, false, { mimetype: isVideo ? '' : 'audio/mpeg', asDocument: chat.useDocument })
    } catch {
		m.reply(`Kesalahan: Coba lagi`)
    }

}
handler.help = ['play2 <query>']
handler.tags = ['downloader']
handler.command = ['play2', 'playvid2']
handler.register = true
handler.limit = true

export default handler