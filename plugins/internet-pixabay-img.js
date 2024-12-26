import axios from "axios";

let handler = async (m, {conn, text}) => {
if (!text) return m.reply('masukan query pencarian')
try {
let { data } = await axios.get('https://pixabay.com/api/?key=30089426-4575ed7bbbc8bfffe9a0b8eb4&q='+text)
let result = data.hits.getRandom()
await conn.sendFile(m.chat, result.largeImageURL, '', `*Tags:* ${result.tags}\n*Views:* ${result.views}\n*Downloads:* ${result.downloads}\n*Collections:* ${result.collections}\n*Likes:* ${result.likes}\n*Comments:* ${result.comments}\n*User:* ${result.user}`, m)
} catch (e) {
throw eror
}
}
handler.help = ['pixabayimage']
handler.tags = ['internet']
handler.command = /^(pix(abay)?im(a)?g(e)?)$/i
export default handler