/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import uploadImage from '../lib/uploadImage.js'
import {
    sticker
} from '../lib/sticker.js'

let handler = async (m, {
    conn,
    text
}) => {
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw 'Tidak ada foto'
        if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
        let img = await q.download?.()
        let url = await uploadImage(img)
        let wasted = `https://some-random-api.com/canvas/wasted?avatar=${url}`
        let stiker = await sticker(null, wasted, packname, author)
        conn.sendFile(m.chat, stiker, 'wasted.webp', '', m)
    } catch (e) {
        m.reply('Conversion Failed')
    }
}
handler.help = ['wasted']
handler.tags = ['sticker']
handler.command = /^wasted$/i

export default handler