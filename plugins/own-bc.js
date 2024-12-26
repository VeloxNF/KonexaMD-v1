/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import { randomBytes } from 'crypto'

let handler = async (m, { conn, text }) => {
  let chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map(v => v[0])
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = ''
  conn.reply(m.chat, `_Mengirim Broadcast Ke ${chats.length} Chat_`, m)
  for (let id of chats) await conn.copyNForward(id, conn.cMod(m.chat, cc,
   /bc|broadcast/i.test(teks) ? teks : teks +
   '「 📣 B R O A D C A S T 」\n\n' +
    text + '\n' +
     readMore + '\n' +
      namebot),
       true).catch(_ => _)
  m.reply('Selesai Broadcast All Chat :)')
}
handler.help = ['bcchats']
handler.tags = ['owner']
handler.command = /^(broadcastchats?|bcc(hats?)?)$/i

handler.owner = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)