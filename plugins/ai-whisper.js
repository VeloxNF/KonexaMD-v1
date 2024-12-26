import { transcribe } from '../scraper/transcribe.js';

let handler = async(m, { conn, text, args, command, usedPrefix}) => {

let q = m.quoted ? m.quoted : m
if (!q) return m.reply('Media not found')
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    
if (!/audio/.test(mime)) return m.reply(`Reply audio dengan perintah ${usedPrefix + command}`)

let media = await q.download?.()
let { data, success } = await transcribe(media);
if (!success) return m.reply('Gagal memuat data.');
conn.sendMessage(m.chat, {text: data.text}, {quoted: m})
}

handler.help = ['whisper','transcribe']
handler.tags = ['ai']
handler.command = /^(ws|whisper|transcribe)$/i
handler.register = true 
handler.limit = true

export default handler