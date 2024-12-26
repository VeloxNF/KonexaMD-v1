import axios from "axios";

let handler = async (m, {conn, text}) => {
if (!text) return m.reply('masukan query pencarian')
try {
let { data } = await axios.get('https://pixabay.com/api/videos?key=30089426-4575ed7bbbc8bfffe9a0b8eb4&q='+text)
let result = data.hits.getRandom()
await conn.sendMessage(m.chat, {video: {url: result.videos.medium.url}, caption: `*Result from:* ${text}`, gifPlayback: true, contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: text,
body: result.videos.medium.url,
mediaType: 2,
thumbnailUrl: result.videos.medium.thumbnail,
sourceUrl: result.videos.medium.url,
renderLargerThumbnail: true
}}}, {quoted: m})
} catch (e) {
throw eror
}
}
handler.help = ['pixabayvideo']
handler.tags = ['internet']
handler.command = /^(pix(abay)?vid(eo)?(s)?)$/i
export default handler