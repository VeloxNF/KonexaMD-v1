let handler = async (m, { conn, usedPrefix, command }) => {
        let p = m.quoted ? m.quoted : m
    	
    	
        let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `Reply Videonya`
    let q = p.message ? p.message : p.mediaMessage
conn.relayMessage(m.chat, { ptvMessage: q.videoMessage }, {})
}
handler.help = ['toptv']
handler.tags = ['tools']

handler.command = /^to(ptv)$/i
handler.register = true

export default handler