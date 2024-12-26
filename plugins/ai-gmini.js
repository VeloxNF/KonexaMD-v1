import axios from 'axios'
let handler = async (m, {conn, text, usedPrefix, command}) => {

let teks 
if (m.quoted) {
teks = m.quoted.text
} else if (text) {
teks = text
} else throw `[ invalid ]\n*gunakan command*:\n${usedPrefix+command} siapa presiden Indonesia`

try {
await m.reply(wait)
let {data} = await axios.post("https://gmni.vercel.app/api/chats", { username: m.sender, text: teks });
m.reply(data.modelResponse)
} catch (e) {
throw eror
}
}
handler.help = handler.command = ['gmni']
handler.tags = ['ai']
handler.limit = handler.register = true 
export default handler