/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from 'axios'

let handler = async (m, {
    conn,
    args,
    command,
    usedPrefix
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'media not found'
    let media = await q.download()

    try {
        m.reply(wait)
        let result = await upscale(media);
        conn.sendFile(m.chat, result, 'remini.jpg', `*Result from*: ${usedPrefix+command} ${text}
`, m)
    } catch (e) {
        throw eror
    }

}
handler.help = ['remini-v2']
        handler.command = /^(remini-v2)$/i
        handler.tags = ['ai']
        handler.premium = true

        export default handler

        async function upscale(buffer) {
            let req = await require('axios').post('https://backend.zyro.com/v1/ai/upscale-image', {
                image: `data:image/jpeg;base64,${buffer.toString('base64')}`
            }).catch(e => e.response)
            if (req.status !== 200) throw req.data || req.statusText
            return Buffer.from(req.data.result.split(',')[1], 'base64')
        }