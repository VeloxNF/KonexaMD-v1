let handler = m => m

handler.before = async (m) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.simi && !chat.isBanned ) {
        if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return
        if (!m.text) return
        let res = await fetchJson(`https://simsimi.fun/api/v2/?mode=talk&lang=id&message=${m.text}&filter=false`)
        if (!res.success) throw eror

        if (res.success == 'Aku tidak mengerti apa yang kamu katakan.Tolong ajari aku.') return m.reply('Kwjsjsjwjwjwj ngomong yang jelas -_')
        await m.reply(`${res.success}`)
        return !0
    }
    return true
}
export default handler