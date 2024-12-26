import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
let { generateWAMessageFromContent } = (await import("@adiwajshing/baileys")).default 
let handler = async (m, { conn, text, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let fitur = Object.values(plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length

let prep = generateWAMessageFromContent(m.chat, { orderMessage: { 
itemCount: `${fitur.length}`, status: 500,
surface: 999,
message: `ᴛᴏᴛᴀʟ ғᴇᴀᴛᴜʀᴇ ${fitur.length}`,
description: '^^',
orderTitle: 'ʙᴇᴊɪʀ ᴅᴇᴋ',
token: '1',
mediaType: 1,
curreyCode: 'IDR',
totalCurrencyCode: 'ʙᴇᴊɪʀ ᴅᴇᴋ',
totalAmount1000: '50000',
sellerJid: '6285212413931@s.whatsapp.net',
thumbnail: fs.readFileSync('./media/asuna.jpg'), 
thumbnaiUrl: 'https://telegra.ph/file/4c3d1daeba74d1993b2a8.jpg'
}}, {contextInfo: null, quoted: m})
conn.relayWAMessage(prep)				
}
handler.help = ['totalfeature']
handler.tags = ['main']
handler.command = /^(feature|totalfeature|totalfitur)$/i
export default handler