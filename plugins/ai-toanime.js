import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async function (m, { conn }) {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No media found'
  let media = await q.download()
  let isTele = /image/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  let ress = await fetch(`https://api.zenkey.my.id/api/maker/toanime?apikey=zenkey&url=${link}`)
 let tag = `@${m.sender.split("@")[0]}`
    let caption = `Nih effect *photo-to-anime* nya\nRequest by: ${tag}`
    await conn.sendMessage(m.chat, { image: ress, caption, mentions: [m.sender] }, { quoted: m })
}
handler.help = ["jadianime"].map(v => v + " (Balas foto)")
handler.tags = ["ai"]
handler.command = /^(jadianime|toanime)$/i
handler.premium = true

export default handler