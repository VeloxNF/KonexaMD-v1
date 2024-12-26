let handler = m => m
handler.before = async function(m, {
    conn,
    isROwner
}) {
    if (m.chat.endsWith('broadcast')) return
    if (m.fromMe) return
    if (m.isGroup) return
let bot = db.data.settings[conn.user.jid]
let orang = global.db.data.users[m.sender]
    // function must join grup
    if (bot.allakses && !orang.premium) {
        
        let user = global.db.data.users[m.sender]
        let idUser = await conn.groupMetadata(setting.idgc)
        if (Object.values(idUser.participants).find(users => users.id == m.sender)) {
            user.banned = false
        } else {
            if (isROwner) {
                user.banned = false
            } else {
                user.banned = true
                await m.reply(`📢 Kamu tidak dapat mengakses fitur ❗\nJoin group ${namebot} untuk mendapatkan akses\n\n> ${global.sgc}`)
            }
        }
    }
}

export default handler