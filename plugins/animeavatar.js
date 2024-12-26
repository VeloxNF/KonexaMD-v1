import fetch from 'node-fetch'
let handler = async (m, { conn, command: _q, usedPrefix: _p }) => {
  await m.reply(wait)
  let res = await fetch('https://nekos.life/api/v2/img/avatar')
  if (!res.ok) throw res.text()
  let json = await res.json()
  if (!json.url) throw `Error, Mungkin Api Mati`
  let image = await fetch(json.url)
  let buffer = await image.buffer()
  await conn.sendFile(m.chat, buffer, 'avatar.jpg', `\n\nDone @${m.sender.split`@`[0]}\n\nCommand: ${_q}`, m)
}
handler.help = ['animeavatar', 'avatar']
handler.tags = ['anime']
handler.command = /^(animeavatar|avatar)$/i
handler.limit = true

export default handler