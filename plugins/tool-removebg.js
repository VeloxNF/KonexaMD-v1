import axios from 'axios'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Kirim/Reply Gambar Dengan Caption ' + usedPrefix+command 
m.reply(wait)

let cap = `*Result from* : ${usedPrefix + command} `

try {
const img = await q.download()
const { data } = await axios.post("https://backend.zyro.com/v1/ai/remove-background", { 
image: "data:image/jpeg;base64," + img.toString("base64") 
})
const image = Buffer.from(data.result.split(",")[1], "base64")
await conn.sendMessage(m.chat, {image: image, caption: cap}, {quoted: m, ephemeralExpiration: m.expiration})
} catch (e) {
m.reply(eror)
} finally {

}

}
handler.help = ['removebg']
handler.tags = ['tools']
handler.command = /^(rembg|removebg)$/i
handler.limit = true 
handler.register = true

export default handler