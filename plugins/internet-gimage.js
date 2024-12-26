/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import { googleImage } from '@bochilteam/scraper'
var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image
    conn.sendFile(m.chat, link, 'google.jpg', `乂 *G O O G L E*\n*Result:* ${usedPrefix + command} ${text}
*Source:* Google
`,m)
}
handler.help = ['gimage']
handler.tags = ['internet']
handler.command = /^(gimage|image)$/i
handler.limit = true
export default handler