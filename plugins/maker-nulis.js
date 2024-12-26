import { format } from 'util'
import { spawn } from 'child_process'

let fontPath = 'src/font/Zahraaa.ttf'
let handler = async (m, { conn, args }) => {
    if (!global.support.convert &&
        !global.support.magick) return handler.disabled = true 
    let inputPath = 'src/kertas.jpg'
    let d = new Date()
    let tgl = d.toLocaleDateString('id-Id')
    let hari = d.toLocaleDateString('id-Id', { weekday: 'long' })
    if (!args[0]) throw 'mau nulis apa kak'
    let teks = args.join` `
    let bufs = []
    const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []),
        'convert',
        inputPath,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '20',
        '-interline-spacing',
        '1',
        '-annotate',
        '+806+78',
        hari,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '18',
        '-interline-spacing',
        '1',
        '-annotate',
        '+806+102',
        tgl,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '20',
        '-interline-spacing',
        '-7.5',
        '-annotate',
        '+344+142',
        teks,
        'jpg:-'
    ]
    spawn(_spawnprocess, _spawnargs)
        .on('error', e => m.reply(format(e)))
        .on('close', () => {
            conn.sendFile(m.chat, Buffer.concat(bufs), 'nulis.jpg', 'Selesai nih nulis nya', m)
        })
        .stdout.on('data', chunk => bufs.push(chunk))
}
handler.help = ['nulis']
handler.tags = ['maker']
handler.command = /^(nulis)$/i

export default handler