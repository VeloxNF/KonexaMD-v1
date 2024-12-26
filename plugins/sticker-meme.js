import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let teks = text.split('|')
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Balas Gambar Dengan Perintah\n\n${usedPrefix + command} <${teks[0] ? teks[0] : 'teks atas'}>|<${teks[1] ? teks[1] : 'teks bawah'}>`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
    let img = await q.download()
    let url = await uploadImage(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(teks[0] ? teks[0] : ' ')}/${encodeURIComponent(teks[1] ? teks[1] : ' ')}.png?background=${url}`
    let stiker = await sticker(false, meme, global.packname, global.author)
    if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, '', { asSticker: 1 })
}
handler.help = ['smeme']
handler.tags = ['tools']
handler.command = /^(smeme)$/i

handler.limit = true

export default handler