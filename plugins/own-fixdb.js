let handler = async (m, {
    conn
}) => {
    let grup = Object.keys(db.data.chats).filter(jid => jid.endsWith('@s.whatsapp.net'))
    let grups = Object.keys(db.data.chats).filter(v => v.endsWith('@g.us'));
    
    let jumlah = 0
    for (let id of grup) {
        delete db.data.chats[id]
        jumlah += 1
    }
    for (let id of grups) {
            try {
            await conn.groupMetadata(id)
        } catch (e) {
            delete db.data.chats[id]
        }

        jumlah += 1
    }
    if (jumlah == 0) {
        await m.reply('Database normal tidak ada yang Error')
    } else {
        await m.reply(`Sukses membersihkan database grup yang Error.\nTotal: ${jumlah} Id`)
    }
}
handler.help = handler.command = ['fixdatabase']
handler.tags = ['owner']
handler.owner = true

export default handler