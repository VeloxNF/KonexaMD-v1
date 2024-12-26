/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = m => m
handler.before = async function(m, {
    conn
}) {
    conn.lahelu = conn.lahelu ? conn.lahelu : {}
    conn.helu = conn.helu ? conn.helu : {}
    let id = m.sender
    if (!m.quoted) return !0

    if (!conn.lahelu[id]) return !0
    if (m.quoted.id == conn.helu[id][0].id) {
        let hasil = conn.lahelu[id][m.text.toLowerCase() - 1]
        try {
            m.reply(wait)
            conn.sendFile(m.chat, 'https://cache.lahelu.com/' + hasil || emror, '', "*Lahelu meme*", m)
            delete conn.lahelu[id]
            delete conn.helu[id]
        } catch (e) {
            throw eror
        }
    }
}
export default handler