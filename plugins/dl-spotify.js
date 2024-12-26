/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import canvafy from "canvafy";
import { 
    searching,
 spotifydl 
 } from '../scraper/spotify-Dl.js'
  
let handler = async (m, { conn, usedPrefix, text, command }) => {
let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} kemarin `
	if (!text) return m.reply(input)
	
m.reply(wait)

const { data, status } = await searching(text)

if (status === false) return m.reply(eror)

const { title, track, artis, durasi, image, download } = await spotifydl(data[0].url);

const fake = {
key: { fromMe: false, participant: m.sender, ...(m.chat ? { remoteJid: "status@broadcast" } : {}) }, message: { "audioMessage": { "title": await style('SPOTIFY', 5),"h": `Hmm`, 'jpegThumbnail': await conn.resize(image, 100, 100)}}
}
    let captionvid = `∘ Title: ${title}\n∘ Artist: ${artis}\n∘ Duration: ${durasi}\n\n\n${global.namebot}`
const p = await new canvafy.Spotify()
            .setTitle(title)
            .setAuthor("Spotify Downloader")
            .setTimestamp(40, 100)
            .setOverlayOpacity(0.8)
            .setBorder("#fff", 0.8)
            .setImage(image)
             .setBlur(3)
            .build();

 let a = await conn.sendFile(m.chat, p, '', captionvid, fake);
conn.sendMessage(m.chat, {audio: {url: download}, mimetype: 'audio/mpeg', ptt: false}, {quoted: a})
   
  }
handler.help = ['spotify <judul>']
handler.tags = ['downloader']
handler.command = /^(spotify)$/i
handler.limit = true
handler.register = true

export default handler