let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}
    let mf = Object.values(conn.menfess).find(mf => mf.status === true)
    if (mf) return !0
    delete conn.menfess[mf.id]
}
handler.tags = ['stop']
handler.help = ['menfess']
handler.command = /^(stop)$/i
handler.register = true
handler.private = true

export default handler