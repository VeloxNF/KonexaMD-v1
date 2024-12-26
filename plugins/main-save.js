/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, text }) => {
  if (!text) return
  let who = m.mentionedJid[0]
  if (!who) throw 'Tag salah satu lah'
  let txt = text.replace('@' + who.split`@`[0], '').trimStart()
  return conn.sendContact(m.chat, who, txt || conn.getName(who), m)
}
handler.help = ['savekontak'].map(v => v + ' @mention <ContactName>')
handler.tags = ['main']

handler.command = /^savekontak$/

export default handler