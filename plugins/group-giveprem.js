let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    try {
        let acak = await conn.groupMetadata(m.chat)
        let peserta = acak.participants.getRandom()
        let data = global.db.data.users[peserta.id]
        if (!args[0]) return m.reply('Jumlah hari?')
        if (data.registered === false && data.registered === 'undefined') return conn.reply(m.chat, `Yah😢 @${peserta.id.split('@')[0]} belum terdaftar di database jadi dapet deh`, null, {
            contextInfo: {
                mentionedJid: acak.participants.map(v => v.id)
            }
        })

        let jumlah = 86400000 * args[0]
        let now = new Date() * 1
        let cap = `Selamat kepada @${peserta.id.split('@')[0]} telah mendapatkan giveaway *Premium*.\n- ${args[0]} Hari`

        await conn.reply(m.chat, cap, null, {
            contextInfo: {
                mentionedJid: acak.participants.map(v => v.id)
            }
        })
        if (now < data.premiumTime) data.premiumTime += jumlah
        else data.premiumTime += now + jumlah
        data.premium = true

    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ['giveprem']
handler.tags = ['group']
handler.owner = handler.group = true

export default handler