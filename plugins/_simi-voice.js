import axios from 'axios'
let handler = m => m

handler.before = async (m) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.simivoice && !chat.isBanned ) {
        if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return
        if (!m.text) return
        let api = await fetchJson(`https://simsimi.fun/api/v2/?mode=talk&lang=id&message=${m.text}&filter=false`)
  
  let id = 'id_001'
  const { data } = await axios.post("https://tiktok-tts.weilnet.workers.dev/api/generation", {
    "text": api.success,
    "voice": id
})
conn.sendMessage(m.chat, { audio: Buffer.from(data.data, "base64"), mimetype: "audio/mp4", ptt: true}, {quoted: m})
        return !0
    }
    return true
}
export default handler