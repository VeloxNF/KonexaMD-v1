import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    let res = await fetch(`https://api.waifu.pics/sfw/waifu`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) return m.reply('Error!')
    conn.sendFile(m.chat, json.url, '', 'istri kartun', m)
}
handler.menu = ['waifu']
handler.tags = ['anime']
handler.command = /^(waifu)$/i
handler.register = true
handler.limit = true
export default handler