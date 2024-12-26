/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'
let exec = promisify(_exec).bind(cp)

import fs from 'fs'

let handler = async (m, {
    text,
    conn
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    if (!text) throw 'masukan volume\n/volume 10'
    try {
m.reply(wait)
        let au = await conn.saveMedia(q, "tmp/volume")

        if (/audio/.test(mime)) {
            let rname = ('voll.mp3')
            exec(`ffmpeg -i ${au} -filter:a volume=${text} ${rname}`,
                (err, stderr, stdout) => {
                    fs.unlinkSync(au)
                    if (err) return m.reply('Error!')
                    let jadie = fs.readFileSync(rname)
                    conn.sendMessage(m.chat, {
                        audio: jadie,
                        mimetype: 'audio/mp4',
                        ptt: true
                    }, {
                        quoted: m
                    })
                    fs.unlinkSync(rname)
                })
        } else {
            m.reply("Send video/audio")
        }
    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ['volume']
handler.tags = ['tools']

export default handler