/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import { uploadPomf2 } from '../scraper/uploadmp3.js'

let handler = async (m, { conn, args, text, func, usedPrefix, command }) => {

let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No media found'
  let media = await q.download()
const result = await uploadPomf2(media)
let size = result.files[0].size
try {
await m.react('💬')
await m.reply(`name: ${result.files[0].name}
url: ${result.files[0].url}
size: ${await func.toSize(size)}`)
await m.react('✅')
} catch (e) {
m.react('❎')
}
}
handler.help = ['uploadmp3']
handler.tags = ['tools']
handler.command = /^(uploadmp3)$/i
handler.limit = true

export default handler